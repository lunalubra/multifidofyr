import * as fs from "node:fs";
import * as path from "node:path";
import * as prismic from "@prismicio/client";

const REPO_NAME = "multifidofyr";
const WRITE_TOKEN = process.env.PRISMIC_WRITE_TOKEN;

if (!WRITE_TOKEN) {
  console.error("Error: PRISMIC_WRITE_TOKEN env var is required.");
  console.error("Usage: PRISMIC_WRITE_TOKEN=<token> npm run migrate");
  process.exit(1);
}

const writeClient = prismic.createWriteClient(REPO_NAME, {
  writeToken: WRITE_TOKEN,
});

const readClient = prismic.createClient(REPO_NAME);

const migration = prismic.createMigration();

// --- RichText helpers ---
const h1 = (text: string) => [{ type: "heading1" as const, text, spans: [] }];
const h2 = (text: string) => [{ type: "heading2" as const, text, spans: [] }];
const p = (text: string) => [{ type: "paragraph" as const, text, spans: [] }];
const li = (text: string) => ({ type: "list-item" as const, text, spans: [] });

// --- Asset helpers ---
// Images and videos that previously lived as committed files under /public are
// uploaded to the Prismic media library so editors can replace them in the UI.
//
// This script is idempotent: it first lists the assets already in the media
// library and REUSES any whose filename matches (referencing them by id instead
// of re-uploading). Only files that are not yet in the library are uploaded.
// Re-running the migration therefore never creates duplicate assets.
const PUBLIC_DIR = path.join(process.cwd(), "public");
const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
};
const IMAGE_EDIT = { x: 0, y: 0, zoom: 1, background: "transparent" };

type ExistingAsset = { id: string; url: string; kind: string };
const existingAssets = new Map<string, ExistingAsset>();

// Lists every asset already in the media library, keyed by filename.
async function loadExistingAssets() {
  let cursor: string | undefined;
  do {
    const url = new URL("assets", "https://asset-api.prismic.io/");
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url, {
      headers: {
        repository: REPO_NAME,
        authorization: `Bearer ${WRITE_TOKEN}`,
      },
    });
    if (!res.ok) {
      console.warn(
        `Warning: could not list existing assets (HTTP ${res.status}). Files will be uploaded fresh.`
      );
      return;
    }

    const data = (await res.json()) as {
      items?: Array<{ id: string; url: string; filename: string; kind: string }>;
      cursor?: string;
    };
    const items = data.items || [];
    for (const item of items) {
      if (!existingAssets.has(item.filename)) {
        existingAssets.set(item.filename, {
          id: item.id,
          url: item.url,
          kind: item.kind,
        });
      }
    }
    cursor = items.length === 100 ? data.cursor : undefined;
  } while (cursor);

  console.log(`Found ${existingAssets.size} existing asset(s) in the media library.`);
}

function readLocal(publicPath: string) {
  return fs.readFileSync(path.join(PUBLIC_DIR, publicPath.replace(/^\//, "")));
}

// Dependency-free image dimension reader for JPEG / PNG / WebP.
function imageSize(buf: Buffer): { width?: number; height?: number } {
  // PNG
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // WebP (RIFF....WEBP)
  if (
    buf.length >= 30 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    const fmt = buf.toString("ascii", 12, 16);
    if (fmt === "VP8 ") {
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      };
    }
    if (fmt === "VP8L") {
      const b = buf.subarray(21, 26);
      const bits = b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    if (fmt === "VP8X") {
      return {
        width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      };
    }
  }
  // JPEG
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o < buf.length) {
      if (buf[o] !== 0xff) {
        o++;
        continue;
      }
      const marker = buf[o + 1];
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      ) {
        return { height: buf.readUInt16BE(o + 5), width: buf.readUInt16BE(o + 7) };
      }
      o += 2 + buf.readUInt16BE(o + 2);
    }
  }
  return {};
}

// Cache so a file used in several slices yields one shared field value.
const fieldCache = new Map<string, unknown>();

// Image field value. Reuses an existing library asset when present, otherwise
// registers the local file for upload.
function image(publicPath: string, alt: string) {
  const cached = fieldCache.get(publicPath);
  if (cached) return cached;

  const filename = path.basename(publicPath);
  const existing = existingAssets.get(filename);

  let value: unknown;
  if (existing && existing.kind === "image") {
    const { width, height } = imageSize(readLocal(publicPath));
    value = {
      id: existing.id,
      url: existing.url,
      dimensions: { width, height },
      edit: { ...IMAGE_EDIT },
      alt,
      copyright: null,
    };
  } else {
    const ext = path.extname(publicPath).toLowerCase();
    const file = new File([readLocal(publicPath)], filename, { type: MIME[ext] });
    value = migration.createAsset(file, filename, { alt });
  }

  fieldCache.set(publicPath, value);
  return value;
}

// Link-to-media field value (videos). Reuses an existing library asset when
// present, otherwise registers the local file for upload.
function media(publicPath: string) {
  const filename = path.basename(publicPath);
  const existing = existingAssets.get(filename);
  if (existing) {
    return { link_type: "Media" as const, id: existing.id };
  }
  const ext = path.extname(publicPath).toLowerCase();
  const file = new File([readLocal(publicPath)], filename, { type: MIME[ext] });
  return { link_type: "Media" as const, id: migration.createAsset(file, filename) };
}

// All clinic gallery photos, in display order.
//
// The Prismic Migration API rejects a document referencing more than ~10 assets
// in a single write, and the home page already uses 9 (hero, 2 team, 3
// equipment, video poster, 2 videos). So the gallery images live in their own
// `gallery` singleton document (see buildGalleryData), which the home page reads
// via SliceZone context — keeping every document under the cap.
const GALLERY_IMAGES: Array<[string, string]> = [
  ["/images/clinic/recepcion-arte.jpg", "Recepción de la clínica con arte anatómico decorativo"],
  ["/images/clinic/recepcion-mostrador.jpg", "Mostrador de recepción con cuadros anatómicos"],
  ["/images/clinic/recepcion-bienvenida.jpg", "Área de bienvenida de la clínica"],
  ["/images/clinic/sala-ejercicio.jpg", "Sala de ejercicio con equipamiento deportivo y jardín vertical"],
  ["/images/clinic/despacho.jpg", "Despacho de consulta profesional"],
  ["/images/clinic/sala-tratamiento-1.jpg", "Sala de tratamiento con camilla y equipamiento médico"],
  ["/images/clinic/sala-tratamiento-2.jpg", "Segunda sala de tratamiento con camilla y material terapéutico"],
];

// The `gallery` singleton holds every clinic photo (7 images = 7 assets, under
// the per-document cap).
function buildGalleryData() {
  return {
    images: GALLERY_IMAGES.map(([file, alt]) => ({ image: image(file, alt) })),
  };
}

function buildPageData() {
  return {
    title: h1("Multífido Fisioterapia & Readaptación"),
    meta_title: "Multífido Fisioterapia & Readaptación | Leganés, Madrid",
    meta_description:
      "Clínica de fisioterapia y readaptación deportiva en Leganés. Especialistas en prevención y rehabilitación de lesiones. Fisioterapia avanzada, entrenamiento personal, pilates y psicoeducación.",
    slices: [
      // === 1. HERO SECTION ===
      {
        slice_type: "hero_section",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          heading: h1("Fisioterapia & Readaptación"),
          tagline: p("Especialistas en prevención y readaptación de lesiones"),
          cta_label: "Reserva tu Cita",
          cta_link: { link_type: "Web", url: "#contacto" },
          cta_secondary_label: "Conócenos",
          cta_secondary_link: { link_type: "Web", url: "#quienes-somos" },
          background_image: image(
            "/images/clinic/sala-ejercicio.jpg",
            "Sala de ejercicio de la clínica Multífido"
          ),
        },
        items: [],
      },

      // === 2. ABOUT SECTION ===
      {
        slice_type: "about_section",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          section_id: "quienes-somos",
          eyebrow: "Sobre Nosotros",
          heading: h2("Quiénes Somos"),
          description: p(
            "Somos una clínica de fisioterapia y readaptación deportiva ubicada en el barrio de Arroyoculebro, en Leganés. Nuestra filosofía de trabajo se basa en cuatro pilares fundamentales que guían cada tratamiento y cada sesión de entrenamiento que ofrecemos."
          ),
        },
        items: [
          {
            pillar_title: "Variabilidad",
            pillar_description: p(
              "Abordamos tu lesión desde múltiples enfoques terapéuticos, combinando distintas técnicas y herramientas para ofrecerte el tratamiento más completo y efectivo posible."
            ),
          },
          {
            pillar_title: "Feedback de Resultados",
            pillar_description: p(
              "Monitorización constante de tu progreso con mediciones objetivas. Queremos que veas y sientas tu evolución en cada sesión, con datos reales que respalden tu mejoría."
            ),
          },
          {
            pillar_title: "Especificidad",
            pillar_description: p(
              "Cada persona es única. Realizamos una evaluación exhaustiva y personalizada para diseñar un plan de tratamiento específico adaptado a tus necesidades, objetivos y condición física."
            ),
          },
          {
            pillar_title: "Alianza Terapéutica",
            pillar_description: p(
              "Construimos una relación de confianza contigo. Creemos que la comunicación, la empatía y el trabajo en equipo entre terapeuta y paciente son la base de una recuperación exitosa."
            ),
          },
        ],
      },

      // === 3. TEAM SECTION ===
      {
        slice_type: "team_section",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          section_id: "equipo",
          eyebrow: "Nuestro Equipo",
          heading: h2("Nuestro Equipo"),
        },
        items: [
          {
            name: "Alicia Martín Pérez",
            role: "CEO y Fisioterapeuta",
            credentials: "Colegiada nº 2844",
            photo: image("/images/team/alicia.jpg", "Alicia Martín Pérez"),
            bio: [
              li(
                "Especialista en prevención y readaptación de lesiones en crosstraining"
              ),
              li("Especialista en ecografía musculoesquelética"),
              li(
                "Especialista en rehabilitación y readaptación del ligamento cruzado anterior"
              ),
              li(
                "Especialista en fisioterapia invasiva (EPI, punción seca, neuromodulación)"
              ),
              li("Especialista en Pilates Suelo"),
            ],
          },
          {
            name: "Tomás Rivera Torés",
            role: "Fisioterapeuta",
            credentials: "Colegiado nº 16377",
            photo: image("/images/team/tomas.jpg", "Tomás Rivera Torés"),
            bio: [
              li("Graduado en Fisioterapia por la Universidad de Zaragoza"),
              li(
                "Máster en Preparación Física y Readaptación Deportiva, Instituto ISAF"
              ),
              li(
                "Máster en Entrenamiento Funcional de Alto Rendimiento, Instituto ISAF"
              ),
              li("Máster en Fisioterapia Instrumental, UCJC"),
              li(
                "Máster Experto en Tratamiento de Lesiones, Escuela de Postgrado de Medicina y Sanidad"
              ),
              li(
                "Máster Experto en Rehabilitación Deportiva, Escuela de Postgrado de Medicina y Sanidad"
              ),
            ],
          },
        ],
      },

      // === 4. SERVICES SECTION ===
      {
        slice_type: "services_section",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          section_id: "servicios",
          eyebrow: "Qué Ofrecemos",
          heading: h2("Nuestros Servicios"),
          description: p(
            "Ofrecemos una amplia gama de servicios de salud y bienestar, adaptados a las necesidades de cada paciente."
          ),
        },
        items: [
          {
            service_name: "Fisioterapia Avanzada",
            service_description: p(
              "Tratamiento personalizado de lesiones musculoesqueléticas con técnicas avanzadas: ecografía diagnóstica, EPI, EPTE, neuromodulación, punción seca, electropuntura y presoterapia."
            ),
          },
          {
            service_name: "Entrenamiento Personal",
            service_description: p(
              "Programas de entrenamiento individualizados, diseñados por profesionales titulados en ciencias del deporte. Enfocados en tus objetivos: fuerza, resistencia, composición corporal o rendimiento deportivo."
            ),
          },
          {
            service_name: "Entrenamiento Personal en Pareja",
            service_description: p(
              "Comparte la experiencia del entrenamiento con tu pareja, familiar o amigo. Sesiones diseñadas para dos personas con ejercicios adaptados al nivel de cada uno."
            ),
          },
          {
            service_name: "Entrenamiento Personal en Grupo",
            service_description: p(
              "Sesiones dinámicas en grupos reducidos que combinan la atención personalizada con la motivación del trabajo en equipo. Ideal para quienes buscan un ambiente social y desafiante."
            ),
          },
          {
            service_name: "Clases de Pilates Suelo",
            service_description: p(
              "Mejora tu postura, flexibilidad y fuerza con nuestras clases de Pilates en suelo. Impartidas por fisioterapeutas especializadas, con atención a la correcta ejecución de cada movimiento."
            ),
          },
          {
            service_name: "Readaptación Deportiva",
            service_description: p(
              "Programa integral de vuelta a la actividad deportiva tras una lesión. Combinamos fisioterapia y entrenamiento específico para una recuperación completa y segura."
            ),
          },
          {
            service_name: "Psicoeducación",
            service_description: p(
              "Acompañamos tu proceso de recuperación con educación en hábitos, manejo del dolor y bienestar emocional. Te damos las herramientas para entender tu cuerpo y sostener los resultados a largo plazo."
            ),
          },
        ],
      },

      // === 5. EQUIPMENT SECTION ===
      {
        slice_type: "equipment_section",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          section_id: "tecnologia",
          eyebrow: "Tecnología",
          heading: h2("Tecnología Avanzada"),
          description: p(
            "Contamos con equipamiento de última generación para ofrecer los diagnósticos más precisos y los tratamientos más efectivos."
          ),
          coming_soon_label: "Próximamente",
        },
        items: [
          {
            equipment_name: "Ecógrafo Mindray",
            equipment_description: p(
              "Ecografía musculoesquelética de alta resolución para un diagnóstico preciso y en tiempo real de tus lesiones. Nos permite visualizar tejidos blandos, guiar tratamientos invasivos y monitorizar tu evolución."
            ),
            equipment_image: image(
              "/images/equipment/ecografo.webp",
              "Ecógrafo Mindray"
            ),
          },
          {
            equipment_name: "Agupunt APS",
            equipment_description: p(
              "Sistema avanzado de electropuntura y electrólisis percutánea. Permite aplicar corrientes terapéuticas de forma controlada para el tratamiento de tendinopatías, fibrosis y otras patologías del tejido blando."
            ),
            equipment_image: image(
              "/images/equipment/agupunt.webp",
              "Equipo Agupunt APS"
            ),
          },
          {
            equipment_name: "Presoterapia",
            equipment_description: p(
              "Equipamiento de presoterapia para favorecer la circulación sanguínea y linfática, reducir la inflamación y acelerar la recuperación muscular tras el esfuerzo físico o una intervención."
            ),
            equipment_image: image(
              "/images/equipment/preso.webp",
              "Equipo de presoterapia"
            ),
          },
          {
            equipment_name: "Síntesi",
            equipment_description: p("Próximamente."),
            // No image yet — the slice shows the "coming_soon_label" placeholder.
          },
        ],
      },

      // === 6. CLINIC GALLERY ===
      {
        slice_type: "clinic_gallery",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          section_id: "instalaciones",
          eyebrow: "Instalaciones",
          heading: h2("Nuestras Instalaciones"),
        },
        // Images come from the `gallery` singleton document (via SliceZone
        // context), not from this slice, so the home document stays under the
        // Migration API asset cap.
        items: [],
      },

      // === 7. VIDEO SECTION ===
      {
        slice_type: "video_section",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          section_id: "conocenos",
          eyebrow: "Conócenos",
          heading: h2("Conócenos"),
          description: p(
            "Descubre nuestras instalaciones y nuestra forma de trabajar en estos vídeos."
          ),
          poster_image: image(
            "/images/clinic/recepcion-bienvenida.jpg",
            "Área de bienvenida de la clínica"
          ),
        },
        items: [
          {
            video_file: media("/videos/sintesis-1.mp4"),
            video_title: "Nuestra clínica en acción",
          },
          {
            video_file: media("/videos/sintesis-2.mp4"),
            video_title: "Conoce Multífido",
          },
        ],
      },

      // === 8. CONTACT SECTION ===
      {
        slice_type: "contact_section",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          section_id: "contacto",
          heading: h2("Contacto"),
          booking_label: "Reserve una cita",
          doctoralia_widget_url:
            "https://www.doctoralia.es/clinicas/multifido-fisioterapia-y-readaptacion",
          doctoralia_facility: "multifido-fisioterapia-y-readaptacion",
          map_embed_url:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.8!2d-3.764!3d40.328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle+Valdemoro+11%2C+28914+Legan%C3%A9s!5e0!3m2!1ses!2ses!4v1",
          label_address: "Dirección",
          address: p("Calle Valdemoro 11, 28914 Leganés, Madrid"),
          label_phone: "Teléfono",
          phone: "604940941",
          label_email: "Email",
          email: "multifidofyr@gmail.com",
          label_hours: "Horario",
          hours_weekday: "Lunes a Viernes: 10:00–14:00 y 16:00–20:00",
          hours_saturday: "Sábados: 09:00–13:00",
          doctoralia_link: {
            link_type: "Web",
            url: "https://www.doctoralia.es/clinicas/multifido-fisioterapia-y-readaptacion?saasonly=true&utm_id=48774&utm_source=widget-facility-48774&utm_medium=facility-big&utm_campaign=&utm_content=#highlight-calendar",
          },
          doctoralia_label: "Reservar en Doctoralia",
          directions_link: {
            link_type: "Web",
            url: "https://maps.google.com/?q=Calle+Valdemoro+11,+28914+Legan%C3%A9s",
          },
          directions_label: "Cómo llegar",
        },
        items: [],
      },

      // === 9. LOCATION MAP (legacy — map is rendered inside Contact) ===
      {
        slice_type: "location_map",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          section_id: "donde-estamos",
          heading: h2("Dónde Estamos"),
          map_embed_url:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.8!2d-3.764!3d40.328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle+Valdemoro+11%2C+28914+Legan%C3%A9s!5e0!3m2!1ses!2ses!4v1",
        },
        items: [],
      },
    ],
  };
}

async function run() {
  console.log("Starting migration...");
  try {
    // Reuse assets already in the media library to avoid duplicate uploads.
    await loadExistingAssets();

    const pageData = buildPageData();
    const galleryData = buildGalleryData();

    // === "home" page document ===
    let existingDoc;
    try {
      existingDoc = await readClient.getByUID("page", "home");
      console.log("Found existing 'home' document, updating...");
    } catch {
      console.log("No existing 'home' document found, creating...");
    }

    if (existingDoc) {
      existingDoc.data = pageData as typeof existingDoc.data;
      migration.updateDocument(existingDoc, "Multífido - Home");
    } else {
      migration.createDocument(
        {
          type: "page",
          uid: "home",
          lang: "en-us",
          data: pageData,
        } as Parameters<typeof migration.createDocument>[0],
        "Multífido - Home"
      );
    }

    // === "gallery" singleton document (holds the clinic photos) ===
    let existingGallery;
    try {
      existingGallery = await readClient.getSingle("gallery");
      console.log("Found existing 'gallery' document, updating...");
    } catch {
      console.log("No existing 'gallery' document found, creating...");
    }

    if (existingGallery) {
      existingGallery.data = galleryData as typeof existingGallery.data;
      migration.updateDocument(existingGallery, "Galería de instalaciones");
    } else {
      migration.createDocument(
        {
          type: "gallery",
          lang: "en-us",
          data: galleryData,
        } as Parameters<typeof migration.createDocument>[0],
        "Galería de instalaciones"
      );
    }

    await writeClient.migrate(migration, {
      reporter: (event) => console.log(JSON.stringify(event)),
    });
    console.log("\nMigration completed successfully!");
    console.log(
      'Check your Prismic dashboard at https://multifidofyr.prismic.io to see the "home" page and the "Galería de instalaciones" document.'
    );
  } catch (error) {
    console.error("Migration failed:", error);
    const maybeResponse = (error as { response?: unknown })?.response;
    if (maybeResponse) {
      console.error("Response detail:", JSON.stringify(maybeResponse, null, 2));
    }
    process.exit(1);
  }
}

run();
