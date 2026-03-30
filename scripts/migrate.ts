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
  title: h1("Multifido Fisioterapia & Readaptacion"),
  meta_title:
    "Multifido Fisioterapia & Readaptacion | Leganes, Madrid",
  meta_description:
    "Clinica de fisioterapia y readaptacion deportiva en Leganes. Especialistas en prevencion y rehabilitacion de lesiones. Fisioterapia, entrenamiento personal, pilates y psicologia.",
  slices: [
        // === 1. HERO SECTION ===
        {
          slice_type: "hero_section",
          slice_label: null,
          variation: "default",
          version: "initial",
          primary: {
            heading: h1("Fisioterapia & Readaptacion"),
            tagline: p(
              "Especialistas en prevencion y readaptacion de lesiones"
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
            heading: h2("Quienes Somos"),
            description: p(
              "Somos una clinica de fisioterapia y readaptacion deportiva ubicada en el barrio de Arroyoculebro, en Leganes. Nuestra filosofia de trabajo se basa en cuatro pilares fundamentales que guian cada tratamiento y cada sesion de entrenamiento que ofrecemos."
            ),
          },
          items: [
            {
              pillar_title: "Variabilidad",
              pillar_description: p(
                "Abordamos tu lesion desde multiples enfoques terapeuticos, combinando distintas tecnicas y herramientas para ofrecerte el tratamiento mas completo y efectivo posible."
              ),
            },
            {
              pillar_title: "Feedback de Resultados",
              pillar_description: p(
                "Monitorizacion constante de tu progreso con mediciones objetivas. Queremos que veas y sientas tu evolucion en cada sesion, con datos reales que respalden tu mejoria."
              ),
            },
            {
              pillar_title: "Especificidad",
              pillar_description: p(
                "Cada persona es unica. Realizamos una evaluacion exhaustiva y personalizada para disenar un plan de tratamiento especifico adaptado a tus necesidades, objetivos y condicion fisica."
              ),
            },
            {
              pillar_title: "Alianza Terapeutica",
              pillar_description: p(
                "Construimos una relacion de confianza contigo. Creemos que la comunicacion, la empatia y el trabajo en equipo entre terapeuta y paciente son la base de una recuperacion exitosa."
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
              name: "Alicia Martin Perez",
              role: "CEO y Fisioterapeuta",
              credentials: "Colegiada n. 2844",
              bio: [
                li(
                  "Especialista en prevencion y readaptacion de lesiones en crosstraining"
                ),
                li("Especialista en ecografia musculoesqueletica"),
                li(
                  "Especialista en rehabilitacion y readaptacion del ligamento cruzado anterior"
                ),
                li(
                  "Especialista en fisioterapia invasiva (EPI, puncion seca, neuromodulacion)"
                ),
                li("Especialista en Pilates Suelo"),
              ],
            },
            {
              name: "Luis Manuel Sevillano",
              role: "Entrenador y Readaptador",
              credentials: "Colegiado n. 66546",
              bio: [
                li(
                  "Tecnico Superior en Actividad Fisica y Deportiva (TAFAD)"
                ),
                li(
                  "Graduado en Ciencias de la Actividad Fisica y del Deporte (CAFYD)"
                ),
                li(
                  "Master Oficial en Ejercicio y Nutricion para la Salud (MUENS)"
                ),
                li(
                  "Especialista en prescripcion de ejercicio para dolor lumbar"
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
              service_name: "Fisioterapia",
              service_description: p(
                "Tratamiento personalizado de lesiones musculoesqueleticas con tecnicas avanzadas: ecografia diagnostica, EPI, EPTE, neuromodulacion, puncion seca, electropuntura y presoterapia."
              ),
            },
            {
              service_name: "Entrenamiento Personal",
              service_description: p(
                "Programas de entrenamiento individualizados, disenados por profesionales titulados en ciencias del deporte. Enfocados en tus objetivos: fuerza, resistencia, composicion corporal o rendimiento deportivo."
              ),
            },
            {
              service_name: "Entrenamiento Personal en Pareja",
              service_description: p(
                "Comparte la experiencia del entrenamiento con tu pareja, familiar o amigo. Sesiones disenadas para dos personas con ejercicios adaptados al nivel de cada uno."
              ),
            },
            {
              service_name: "Entrenamiento Personal en Grupo",
              service_description: p(
                "Sesiones dinamicas en grupos reducidos que combinan la atencion personalizada con la motivacion del trabajo en equipo. Ideal para quienes buscan un ambiente social y desafiante."
              ),
            },
            {
              service_name: "Clases de Pilates Suelo",
              service_description: p(
                "Mejora tu postura, flexibilidad y fuerza con nuestras clases de Pilates en suelo. Impartidas por fisioterapeutas especializadas, con atencion a la correcta ejecucion de cada movimiento."
              ),
            },
            {
              service_name: "Readaptacion Deportiva",
              service_description: p(
                "Programa integral de vuelta a la actividad deportiva tras una lesion. Combinamos fisioterapia y entrenamiento especifico para una recuperacion completa y segura."
              ),
            },
            {
              service_name: "Psicologia",
              service_description: p(
                "Servicio de atencion psicologica para acompanar el proceso de recuperacion y bienestar emocional. Abordamos la dimension mental de la salud de forma integral."
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
            heading: h2("Tecnologia Avanzada"),
            description: p(
              "Contamos con equipamiento de ultima generacion para ofrecer los diagnosticos mas precisos y los tratamientos mas efectivos."
            ),
          },
          items: [
            {
              equipment_name: "Ecografo Mindray",
              equipment_description: p(
                "Ecografia musculoesqueletica de alta resolucion para un diagnostico preciso y en tiempo real de tus lesiones. Nos permite visualizar tejidos blandos, guiar tratamientos invasivos y monitorizar tu evolucion."
              ),
              equipment_image_url: "/images/equipment/ecografo.webp",
            },
            {
              equipment_name: "Agupunt APS",
              equipment_description: p(
                "Sistema avanzado de electropuntura y electrolisis percutanea. Permite aplicar corrientes terapeuticas de forma controlada para el tratamiento de tendinopatias, fibrosis y otras patologias del tejido blando."
              ),
              equipment_image_url: "/images/equipment/agupunt.webp",
            },
            {
              equipment_name: "Presoterapia",
              equipment_description: p(
                "Equipamiento de presoterapia para favorecer la circulacion sanguinea y linfatica, reducir la inflamacion y acelerar la recuperacion muscular tras el esfuerzo fisico o una intervencion."
              ),
              equipment_image_url: "/images/equipment/preso.webp",
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
                "Recepcion de la clinica con arte anatomico decorativo",
            },
            {
              image_url: "/images/clinic/recepcion-mostrador.jpg",
              alt_text:
                "Mostrador de recepcion con cuadros anatomicos",
            },
            {
              image_url: "/images/clinic/recepcion-bienvenida.jpg",
              alt_text: "Area de bienvenida de la clinica",
            },
            {
              image_url: "/images/clinic/sala-ejercicio.jpg",
              alt_text:
                "Sala de ejercicio con equipamiento deportivo y jardin vertical",
            },
            {
              image_url: "/images/clinic/despacho.jpg",
              alt_text: "Despacho de consulta profesional",
            },
            {
              image_url: "/images/clinic/sala-tratamiento-1.jpg",
              alt_text:
                "Sala de tratamiento con camilla y equipamiento medico",
            },
            {
              image_url: "/images/clinic/sala-tratamiento-2.jpg",
              alt_text:
                "Segunda sala de tratamiento con camilla y material terapeutico",
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
            heading: h2("Conocenos"),
            description: p(
              "Descubre nuestras instalaciones y nuestra forma de trabajar en estos videos."
            ),
          },
          items: [
            {
              video_url: "/videos/sintesis-1.mp4",
              video_title: "Nuestra clinica en accion",
            },
            {
              video_url: "/videos/sintesis-2.mp4",
              video_title: "Conoce Multifido",
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
              "Calle Valdemoro 11, 28914 Leganes, Madrid"
            ),
            email: "multifidofyr@gmail.com",
            phone: "604940941",
            hours_weekday:
              "Lunes a Viernes: 10:00\u201314:00 y 16:00\u201320:00",
            hours_saturday: "Sabados: 09:00\u201313:00",
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
            heading: h2("Donde Estamos"),
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
      migration.updateDocument(existingDoc, "Multifido - Home");
    } else {
      // Create new document
      migration.createDocument(
        {
          type: "page",
          uid: "home",
          lang: "en-us",
          data: pageData,
        },
        "Multifido - Home"
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
    process.exit(1);
  }
}

run();
