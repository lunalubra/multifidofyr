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

// Helper for RichText fields
const h1 = (text: string) => [
  { type: "heading1" as const, text, spans: [] },
];
const h2 = (text: string) => [
  { type: "heading2" as const, text, spans: [] },
];
const p = (text: string) => [
  { type: "paragraph" as const, text, spans: [] },
];
const li = (text: string) => ({
  type: "list-item" as const,
  text,
  spans: [],
});

const pageData = {
  title: h1("Multífido Fisioterapia & Readaptación"),
  meta_title:
    "Multífido Fisioterapia & Readaptación | Leganés, Madrid",
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
            tagline: p(
              "Especialistas en prevención y readaptación de lesiones"
            ),
            cta_label: "Reserva tu Cita",
            cta_link: { link_type: "Web", url: "#contacto" },
            background_image_url: "/images/clinic/sala-ejercicio.jpg",
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
            heading: h2("Nuestro Equipo"),
          },
          items: [
            {
              name: "Alicia Martín Pérez",
              role: "CEO y Fisioterapeuta",
              credentials: "Colegiada nº 2844",
              photo_url: "/images/team/alicia.jpg",
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
              photo_url: "/images/team/tomas.jpg",
              bio: [
                li(
                  "Graduado en Fisioterapia por la Universidad de Zaragoza"
                ),
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
            heading: h2("Tecnología Avanzada"),
            description: p(
              "Contamos con equipamiento de última generación para ofrecer los diagnósticos más precisos y los tratamientos más efectivos."
            ),
          },
          items: [
            {
              equipment_name: "Ecógrafo Mindray",
              equipment_description: p(
                "Ecografía musculoesquelética de alta resolución para un diagnóstico preciso y en tiempo real de tus lesiones. Nos permite visualizar tejidos blandos, guiar tratamientos invasivos y monitorizar tu evolución."
              ),
              equipment_image_url: "/images/equipment/ecografo.webp",
            },
            {
              equipment_name: "Agupunt APS",
              equipment_description: p(
                "Sistema avanzado de electropuntura y electrólisis percutánea. Permite aplicar corrientes terapéuticas de forma controlada para el tratamiento de tendinopatías, fibrosis y otras patologías del tejido blando."
              ),
              equipment_image_url: "/images/equipment/agupunt.webp",
            },
            {
              equipment_name: "Presoterapia",
              equipment_description: p(
                "Equipamiento de presoterapia para favorecer la circulación sanguínea y linfática, reducir la inflamación y acelerar la recuperación muscular tras el esfuerzo físico o una intervención."
              ),
              equipment_image_url: "/images/equipment/preso.webp",
            },
            {
              equipment_name: "Síntesi",
              equipment_description: p(
                "Próximamente."
              ),
              equipment_image_url: "",
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
            heading: h2("Nuestras Instalaciones"),
          },
          items: [
            {
              image_url: "/images/clinic/recepcion-arte.jpg",
              alt_text:
                "Recepción de la clínica con arte anatómico decorativo",
            },
            {
              image_url: "/images/clinic/recepcion-mostrador.jpg",
              alt_text:
                "Mostrador de recepción con cuadros anatómicos",
            },
            {
              image_url: "/images/clinic/recepcion-bienvenida.jpg",
              alt_text: "Área de bienvenida de la clínica",
            },
            {
              image_url: "/images/clinic/sala-ejercicio.jpg",
              alt_text:
                "Sala de ejercicio con equipamiento deportivo y jardín vertical",
            },
            {
              image_url: "/images/clinic/despacho.jpg",
              alt_text: "Despacho de consulta profesional",
            },
            {
              image_url: "/images/clinic/sala-tratamiento-1.jpg",
              alt_text:
                "Sala de tratamiento con camilla y equipamiento médico",
            },
            {
              image_url: "/images/clinic/sala-tratamiento-2.jpg",
              alt_text:
                "Segunda sala de tratamiento con camilla y material terapéutico",
            },
          ],
        },

        // === 7. VIDEO SECTION ===
        {
          slice_type: "video_section",
          slice_label: null,
          variation: "default",
          version: "initial",
          primary: {
            section_id: "conocenos",
            heading: h2("Conócenos"),
            description: p(
              "Descubre nuestras instalaciones y nuestra forma de trabajar en estos vídeos."
            ),
          },
          items: [
            {
              video_url: "/videos/sintesis-1.mp4",
              video_title: "Nuestra clínica en acción",
            },
            {
              video_url: "/videos/sintesis-2.mp4",
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
            address: p(
              "Calle Valdemoro 11, 28914 Legan\u00e9s, Madrid"
            ),
            email: "multifidofyr@gmail.com",
            phone: "604940941",
            hours_weekday:
              "Lunes a Viernes: 10:00\u201314:00 y 16:00\u201320:00",
            hours_saturday: "S\u00e1bados: 09:00\u201313:00",
            doctoralia_link: { link_type: "Web", url: "#" },
          },
          items: [],
        },

        // === 9. LOCATION MAP ===
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

async function run() {
  console.log("Starting migration...");
  try {
    // Try to fetch existing "home" document
    let existingDoc;
    try {
      existingDoc = await readClient.getByUID("page", "home");
      console.log("Found existing 'home' document, updating...");
    } catch {
      console.log("No existing 'home' document found, creating...");
    }

    if (existingDoc) {
      // Update existing document data in place
      existingDoc.data = pageData as typeof existingDoc.data;
      migration.updateDocument(existingDoc, "Multífido - Home");
    } else {
      // Create new document
      migration.createDocument(
        {
          type: "page",
          uid: "home",
          lang: "en-us",
          data: pageData,
        },
        "Multífido - Home"
      );
    }

    await writeClient.migrate(migration, {
      reporter: (event) => console.log(JSON.stringify(event)),
    });
    console.log("\nMigration completed successfully!");
    console.log(
      'Check your Prismic dashboard at https://multifidofyr.prismic.io to see the "home" page.'
    );
  } catch (error) {
    console.error("Migration failed:", error);
    const maybeResponse = (error as { response?: unknown })?.response;
    if (maybeResponse) {
      console.error(
        "Response detail:",
        JSON.stringify(maybeResponse, null, 2)
      );
    }
    process.exit(1);
  }
}

run();
