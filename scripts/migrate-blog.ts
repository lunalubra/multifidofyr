import * as prismic from "@prismicio/client";

const REPO_NAME = "multifidofyr";
const WRITE_TOKEN = process.env.PRISMIC_WRITE_TOKEN;

if (!WRITE_TOKEN) {
  console.error("Error: PRISMIC_WRITE_TOKEN env var is required.");
  console.error(
    "Usage: PRISMIC_WRITE_TOKEN=<token> npx tsx scripts/migrate-blog.ts",
  );
  process.exit(1);
}

const writeClient = prismic.createWriteClient(REPO_NAME, {
  writeToken: WRITE_TOKEN,
});

const readClient = prismic.createClient(REPO_NAME);

const migration = prismic.createMigration();

// Rich text helpers
const h1 = (text: string) => [
  { type: "heading1" as const, text, spans: [] },
];
const h2 = (text: string) => ({
  type: "heading2" as const,
  text,
  spans: [],
});
const h3 = (text: string) => ({
  type: "heading3" as const,
  text,
  spans: [],
});
const p = (text: string) => ({
  type: "paragraph" as const,
  text,
  spans: [],
});
const pBold = (text: string, boldStart: number, boldEnd: number) => ({
  type: "paragraph" as const,
  text,
  spans: [{ type: "strong" as const, start: boldStart, end: boldEnd }],
});
const li = (text: string) => ({
  type: "list-item" as const,
  text,
  spans: [],
});
const liBold = (text: string, boldStart: number, boldEnd: number) => ({
  type: "list-item" as const,
  text,
  spans: [{ type: "strong" as const, start: boldStart, end: boldEnd }],
});

// =============================================================================
// POST 1: Dolor Lumbar
// =============================================================================
const post1Content = [
  p(
    "El dolor lumbar es una de las dolencias mas comunes en la poblacion adulta. Se estima que hasta un 80% de las personas experimentara dolor de espalda en algun momento de su vida. Sin embargo, la buena noticia es que la mayoria de estos episodios pueden prevenirse con una rutina adecuada de ejercicios.",
  ),
  p(
    "En nuestra clinica, trabajamos diariamente con pacientes que sufren dolor lumbar cronico y agudo. A lo largo de los anos, hemos identificado que la combinacion de fortalecimiento, movilidad y estabilidad es la clave para mantener una espalda sana.",
  ),

  h2("Por que aparece el dolor lumbar"),
  p(
    "Antes de hablar de prevencion, es importante entender las causas mas frecuentes. El dolor lumbar puede tener multiples origenes, pero en la mayoria de los casos se relaciona con factores modificables:",
  ),
  liBold(
    "Sedentarismo prolongado: Pasar mas de 6 horas sentado debilita la musculatura estabilizadora de la columna.",
    0,
    24,
  ),
  liBold(
    "Debilidad del core: La falta de tono en los musculos abdominales profundos genera inestabilidad lumbar.",
    0,
    18,
  ),
  liBold(
    "Rigidez de cadera: La falta de movilidad en la articulacion coxofemoral transfiere carga a la columna lumbar.",
    0,
    19,
  ),
  liBold(
    "Patrones de movimiento incorrectos: Levantar peso con la espalda en lugar de con las piernas es una de las causas mas habituales de lesion.",
    0,
    39,
  ),

  h2("Los 5 ejercicios que recomendamos"),
  p(
    "Estos ejercicios estan disenados para realizarse en casa, sin equipamiento especial. Recomendamos hacerlos al menos 3 veces por semana para obtener beneficios reales.",
  ),

  h3("1. Bird-Dog (Cuadrupedia alternada)"),
  p(
    "Desde posicion de cuadrupedia, extiende simultaneamente el brazo derecho y la pierna izquierda, manteniendo la columna neutra. Aguanta 5 segundos y alterna. Este ejercicio activa los multifidos y el transverso abdominal, dos musculos fundamentales para la estabilidad lumbar.",
  ),
  p("Realiza 3 series de 8-10 repeticiones por lado."),

  h3("2. Puente de gluteos (Glute Bridge)"),
  p(
    "Tumbado boca arriba con las rodillas flexionadas, eleva la cadera apretando los gluteos. El puente de gluteos fortalece toda la cadena posterior y reduce la carga sobre la columna lumbar. Es un ejercicio seguro incluso en fases de dolor agudo.",
  ),
  p("Realiza 3 series de 12-15 repeticiones."),

  h3("3. Dead Bug (Bicho muerto)"),
  p(
    "Tumbado boca arriba con brazos extendidos hacia el techo y rodillas a 90 grados, baja alternadamente un brazo y la pierna contraria hacia el suelo sin que la zona lumbar se despegue. Este ejercicio trabaja la estabilidad del core en un patron anti-extension.",
  ),
  p("Realiza 3 series de 8 repeticiones por lado."),

  h3("4. Estiramiento del psoas en zancada"),
  p(
    "En posicion de zancada con la rodilla trasera apoyada en el suelo, lleva la cadera hacia adelante suavemente. El acortamiento del psoas iliaco es una causa muy frecuente de dolor lumbar, especialmente en personas que pasan muchas horas sentadas.",
  ),
  p("Mantener 30-45 segundos por lado, 2 repeticiones."),

  h3("5. Rotaciones de columna toracica"),
  p(
    "Desde posicion de cuadrupedia o sentado, realiza rotaciones del tronco superior llevando la mano detras de la cabeza y rotando hacia arriba. Mejorar la movilidad toracica evita que la columna lumbar compense movimientos que no le corresponden.",
  ),
  p("Realiza 2 series de 10 rotaciones por lado."),

  h2("Cuando acudir al fisioterapeuta"),
  p(
    "Si llevas mas de 2 semanas con dolor lumbar que no mejora, si el dolor te despierta por la noche o si experimentas irradiacion hacia las piernas, es momento de consultar a un profesional. En Multifido contamos con ecografia musculoesqueletica para un diagnostico preciso y tratamientos avanzados como la electrolisis percutanea (EPI) y la neuromodulacion.",
  ),
  p(
    "Recuerda: la prevencion siempre es mas efectiva que el tratamiento. Incorpora estos ejercicios en tu rutina y tu espalda te lo agradecera.",
  ),
];

// =============================================================================
// POST 2: Ligamento Cruzado Anterior
// =============================================================================
const post2Content = [
  p(
    "La rotura del ligamento cruzado anterior (LCA) es una de las lesiones mas temidas en el mundo del deporte. Cada ano, miles de deportistas afrontan la larga travesia de la rehabilitacion, un proceso que puede durar entre 9 y 12 meses. En este articulo te explicamos en detalle como es el camino de la recuperacion y que puedes esperar en cada fase.",
  ),

  h2("Que es el ligamento cruzado anterior"),
  p(
    "El LCA es una estructura ligamentosa situada en el interior de la rodilla que une el femur con la tibia. Su funcion principal es evitar el desplazamiento anterior de la tibia y aportar estabilidad rotacional a la rodilla. Es fundamental para actividades que impliquen cambios de direccion, saltos y desaceleraciones.",
  ),
  p(
    "La lesion se produce habitualmente por un mecanismo de no contacto: un giro brusco con el pie fijo en el suelo, una recepcion de salto con la rodilla en valgo, o una desaceleracion subita. Es frecuente en deportes como el futbol, baloncesto, padel y esqui.",
  ),

  h2("Fases de la rehabilitacion"),

  h3("Fase 1: Control del dolor e inflamacion (Semanas 0-2)"),
  p(
    "Los objetivos inmediatos tras la cirugia son reducir la inflamacion, recuperar la extension completa de rodilla y activar el cuadriceps. En esta fase utilizamos:",
  ),
  li("Crioterapia y compresion para controlar el edema"),
  li("Movilizaciones pasivas y activas asistidas de rodilla"),
  li("Isometricos de cuadriceps y electroestimulacion"),
  li("Marcha con muletas con carga parcial progresiva"),

  h3("Fase 2: Recuperacion de rango y fuerza basica (Semanas 2-6)"),
  p(
    "Una vez controlada la inflamacion, el trabajo se centra en recuperar el rango completo de movimiento y comenzar el fortalecimiento muscular:",
  ),
  li("Ejercicios en cadena cinetica cerrada (sentadilla parcial, prensa)"),
  li("Trabajo propioceptivo basico (superficies estables)"),
  li("Bicicleta estatica sin resistencia progresando a resistencia leve"),
  li("Ejercicios en piscina si la herida lo permite"),

  h3("Fase 3: Fortalecimiento avanzado (Semanas 6-12)"),
  p(
    "En esta fase buscamos recuperar la fuerza y resistencia muscular. El trabajo se intensifica significativamente:",
  ),
  li("Sentadilla completa, peso muerto, zancadas"),
  li("Trabajo de cadena cinetica abierta (extension de rodilla controlada)"),
  li("Ejercicios de propiocepcion en superficies inestables"),
  li("Trabajo cardiovascular (bicicleta, eliptica, natacion)"),

  h3("Fase 4: Readaptacion deportiva (Meses 4-9)"),
  p(
    "Aqui comienza la transicion hacia el gesto deportivo. Es la fase donde el readaptador deportivo tiene un papel crucial:",
  ),
  li("Progresion de carrera: caminar rapido, trote, carrera en linea recta"),
  li("Pliometria progresiva (saltos bipodales, unipodales)"),
  li("Ejercicios de cambio de direccion con control progresivo"),
  li("Trabajo especifico del deporte"),

  h3("Fase 5: Vuelta al deporte (Meses 9-12)"),
  p(
    "La vuelta al deporte debe estar respaldada por criterios objetivos, no solo por el tiempo transcurrido. En Multifido utilizamos una bateria de tests validados:",
  ),
  li("Test de fuerza isocinetico (simetria >90%)"),
  li("Hop tests (single hop, triple hop, crossover hop)"),
  li("Tests de agilidad y cambio de direccion"),
  li("Evaluacion psicologica y confianza en la rodilla"),

  h2("Claves para una rehabilitacion exitosa"),
  p(
    "Despues de acompanar a decenas de pacientes en este proceso, hemos identificado varios factores que marcan la diferencia:",
  ),
  liBold(
    "Paciencia y constancia: La recuperacion del LCA es una maraton, no un sprint. Respetar los plazos biologicos de cicatrizacion del injerto es fundamental.",
    0,
    23,
  ),
  liBold(
    "Monitorizacion objetiva: En Multifido utilizamos ecografia y mediciones de fuerza objetivas para guiar la progresion. No dejamos nada al azar.",
    0,
    25,
  ),
  liBold(
    "Trabajo psicologico: El miedo a la re-lesion es real y debe abordarse. Ofrecemos apoyo psicologico integrado en el proceso de rehabilitacion.",
    0,
    21,
  ),
  liBold(
    "Prevencion de re-lesion: El riesgo de volver a romperse el LCA es mayor durante los 2 primeros anos. Un programa de prevencion continuado es esencial.",
    0,
    24,
  ),
  p(
    "Si estas pasando por una lesion de LCA o te han diagnosticado recientemente, no dudes en contactarnos. En Multifido somos especialistas en esta lesion y te acompanaremos en cada paso del camino.",
  ),
];

// =============================================================================
// POST 3: Presoterapia
// =============================================================================
const post3Content = [
  p(
    "La presoterapia se ha convertido en una herramienta fundamental en el ambito de la recuperacion deportiva y la fisioterapia. Lo que antes era exclusivo de clinicas de alto rendimiento, hoy es accesible para cualquier persona que busque optimizar su recuperacion. En este articulo te explicamos que es, como funciona y por que la utilizamos en Multifido.",
  ),

  h2("Que es la presoterapia"),
  p(
    "La presoterapia es una tecnica terapeutica que utiliza dispositivos de compresion neumatica intermitente. Consiste en unas botas o manguitos que se inflan y desinflan de forma secuencial, aplicando presion controlada sobre las extremidades. Esta presion ritmica imita y potencia la accion natural del sistema circulatorio y linfatico.",
  ),

  h2("Como funciona"),
  p(
    "El mecanismo de accion de la presoterapia se basa en tres principios fisiologicos:",
  ),
  liBold(
    "Mejora del retorno venoso: La compresion secuencial facilita el flujo de sangre venosa de vuelta al corazon, eliminando mas eficientemente los metabolitos de desecho acumulados durante el ejercicio.",
    0,
    25,
  ),
  liBold(
    "Drenaje linfatico: La presion favorece el movimiento de la linfa, reduciendo la retencion de liquidos y la inflamacion de los tejidos.",
    0,
    17,
  ),
  liBold(
    "Reduccion del edema: Al mejorar tanto la circulacion sanguinea como la linfatica, se consigue una disminucion significativa de la hinchazon post-ejercicio o post-quirurgica.",
    0,
    20,
  ),

  h2("Beneficios demostrados"),
  p(
    "La evidencia cientifica respalda el uso de la presoterapia en diversos contextos. Los principales beneficios incluyen:",
  ),

  h3("Recuperacion post-entrenamiento"),
  p(
    "Estudios recientes demuestran que una sesion de 20-30 minutos de presoterapia tras un entrenamiento intenso reduce significativamente la percepcion de dolor muscular (DOMS) y acelera la recuperacion de la fuerza muscular. Los deportistas que utilizan presoterapia de forma regular reportan menor fatiga acumulada y mejor rendimiento en sesiones consecutivas.",
  ),

  h3("Rehabilitacion post-quirurgica"),
  p(
    "Tras intervenciones quirurgicas de miembro inferior, como la reconstruccion del ligamento cruzado anterior o la artroscopia de rodilla, la presoterapia ayuda a controlar el edema postoperatorio y acelera la recuperacion. En nuestra clinica, la incorporamos sistematicamente en los protocolos de rehabilitacion.",
  ),

  h3("Patologia venosa y linfatica"),
  p(
    "Pacientes con insuficiencia venosa cronica, linfedema o sensacion de piernas pesadas encuentran un alivio significativo con sesiones regulares de presoterapia. Es especialmente util en personas que pasan muchas horas de pie o en trabajos sedentarios.",
  ),

  h2("Para quien esta indicada"),
  p("La presoterapia es beneficiosa para un amplio rango de personas:"),
  li(
    "Deportistas que buscan optimizar su recuperacion entre sesiones de entrenamiento",
  ),
  li(
    "Pacientes en proceso de rehabilitacion tras una cirugia o lesion",
  ),
  li(
    "Personas con problemas circulatorios o retencion de liquidos",
  ),
  li(
    "Profesionales que pasan muchas horas de pie (hosteleria, sanitarios, comercio)",
  ),
  li(
    "Cualquier persona que busque mejorar su bienestar y reducir la sensacion de fatiga en las piernas",
  ),

  h2("Nuestra experiencia en Multifido"),
  p(
    "En Multifido contamos con equipamiento de presoterapia de ultima generacion. Nuestro protocolo incluye una evaluacion previa para personalizar la presion, la duracion y las zonas de aplicacion segun las necesidades de cada paciente. Las sesiones duran entre 20 y 40 minutos y se pueden combinar con otros tratamientos de fisioterapia para maximizar los resultados.",
  ),
  p(
    "Si quieres probar la presoterapia o tienes dudas sobre si es adecuada para ti, no dudes en consultarnos. Estaremos encantados de asesorarte.",
  ),
];

// =============================================================================
// POST 4: Pilates
// =============================================================================
const post4Content = [
  p(
    "Cuando hablamos de rehabilitacion, muchas personas piensan exclusivamente en tratamientos pasivos: masaje, electroterapia, ultrasonidos. Sin embargo, la evidencia cientifica actual nos dice claramente que el ejercicio terapeutico es la herramienta mas potente para la recuperacion de lesiones. Y dentro del ejercicio terapeutico, el Pilates en suelo ocupa un lugar privilegiado.",
  ),

  h2("Que es el Pilates Suelo"),
  p(
    "El Pilates en suelo (Mat Pilates) es un metodo de ejercicio que se realiza sobre una colchoneta, utilizando fundamentalmente el peso del propio cuerpo como resistencia. Fue desarrollado por Joseph Pilates a principios del siglo XX y se basa en principios de control, precision, fluidez, concentracion, centralizacion y respiracion.",
  ),
  p(
    "A diferencia del Pilates con maquinas (Reformer, Cadillac), el Pilates en suelo es mas accesible y puede practicarse en cualquier espacio. En nuestras clases, complementamos los ejercicios clasicos con elementos como bandas elasticas, pelotas y aros para anadir variedad y progresion.",
  ),

  h2("Por que es ideal para la rehabilitacion"),
  p(
    "Existen varias razones por las que el Pilates en suelo es una herramienta excepcional en el contexto rehabilitador:",
  ),

  h3("Activacion del core profundo"),
  p(
    "El Pilates trabaja de forma especifica los musculos profundos del tronco: transverso abdominal, multifidos, suelo pelvico y diafragma. Estos musculos son los principales estabilizadores de la columna vertebral y su debilidad esta directamente relacionada con el dolor lumbar cronico y la inestabilidad articular.",
  ),

  h3("Control motor y propiocepcion"),
  p(
    "Cada ejercicio de Pilates requiere un alto grado de conciencia corporal. El alumno aprende a mover cada segmento de su cuerpo con precision y control. Esta calidad de movimiento se transfiere directamente a las actividades de la vida diaria y al deporte, reduciendo el riesgo de re-lesion.",
  ),

  h3("Progresion individualizada"),
  p(
    "El Pilates permite una progresion muy gradual, adaptando cada ejercicio al nivel y las limitaciones del paciente. Un mismo ejercicio puede simplificarse para alguien en fase inicial de rehabilitacion o hacerse mas desafiante para un deportista en fase avanzada.",
  ),

  h3("Bajo impacto articular"),
  p(
    "Al realizarse en el suelo, el Pilates elimina la carga de impacto sobre las articulaciones. Esto lo convierte en una opcion segura para pacientes con artrosis, problemas articulares o en fases tempranas de rehabilitacion donde el impacto esta contraindicado.",
  ),

  h2("Pilates impartido por fisioterapeutas"),
  p(
    "En Multifido, nuestras clases de Pilates en suelo estan impartidas por fisioterapeutas. Esta es una diferencia fundamental respecto a la mayoria de centros. Un fisioterapeuta:",
  ),
  li(
    "Conoce la anatomia, la biomecanica y la patologia en profundidad",
  ),
  li(
    "Puede adaptar cada ejercicio a las condiciones clinicas del alumno",
  ),
  li(
    "Identifica compensaciones y patrones de movimiento incorrectos",
  ),
  li(
    "Integra el Pilates dentro de un plan de tratamiento global",
  ),
  li(
    "Trabaja en coordinacion con el equipo de readaptacion para pacientes con lesiones",
  ),

  h2("Para quien recomendamos el Pilates"),
  p(
    "En nuestra experiencia, el Pilates en suelo es especialmente beneficioso para:",
  ),
  li("Personas con dolor lumbar cronico o recurrente"),
  li("Pacientes en fase de recuperacion tras una lesion o cirugia"),
  li("Mujeres en postparto que buscan recuperar la fuerza del core y el suelo pelvico"),
  li("Personas mayores que quieren mantener su movilidad y prevenir caidas"),
  li("Deportistas que buscan mejorar su estabilidad y control corporal"),
  li("Cualquier persona que desee mejorar su postura y bienestar general"),

  p(
    "Si estas interesado en nuestras clases de Pilates en suelo, contacta con nosotros para conocer horarios y disponibilidad. Trabajamos en grupos reducidos para garantizar una atencion personalizada.",
  ),
];

// =============================================================================
// PAGE DEFINITIONS
// =============================================================================
const blogPosts = [
  {
    uid: "ejercicios-prevenir-dolor-lumbar",
    title: "5 Ejercicios para Prevenir el Dolor Lumbar",
    excerpt:
      "El dolor de espalda afecta al 80% de la poblacion. Descubre los ejercicios que recomendamos en clinica para prevenir y aliviar el dolor lumbar desde casa.",
    category: "Fisioterapia",
    publicationDate: "2026-03-15",
    author: "Alicia Martin Perez",
    metaDescription:
      "Guia de ejercicios para prevenir el dolor lumbar por fisioterapeutas especialistas. Bird-dog, puente de gluteos, dead bug y mas.",
    content: post1Content,
  },
  {
    uid: "recuperacion-ligamento-cruzado-anterior",
    title: "Recuperacion del Ligamento Cruzado Anterior: Guia Completa",
    excerpt:
      "Todo lo que necesitas saber sobre la rehabilitacion del LCA: fases, tiempos, ejercicios y criterios de vuelta al deporte explicados por especialistas.",
    category: "Readaptacion",
    publicationDate: "2026-02-28",
    author: "Luis Manuel Sevillano",
    metaDescription:
      "Guia completa de rehabilitacion del LCA. Fases de recuperacion, ejercicios y criterios de vuelta al deporte por especialistas en readaptacion.",
    content: post2Content,
  },
  {
    uid: "beneficios-presoterapia-recuperacion-deportiva",
    title: "Los Beneficios de la Presoterapia en la Recuperacion Deportiva",
    excerpt:
      "Que es la presoterapia, como funciona y por que cada vez mas deportistas y pacientes la utilizan para mejorar su recuperacion.",
    category: "Tecnologia",
    publicationDate: "2026-02-10",
    author: "Alicia Martin Perez",
    metaDescription:
      "Descubre los beneficios de la presoterapia para la recuperacion deportiva y la rehabilitacion. Evidencia cientifica y aplicaciones clinicas.",
    content: post3Content,
  },
  {
    uid: "pilates-suelo-rehabilitacion",
    title: "Pilates Suelo: Por Que es Ideal para la Rehabilitacion",
    excerpt:
      "El Pilates en suelo es una de las herramientas mas potentes para la rehabilitacion de lesiones. Te explicamos por que y como lo aplicamos en nuestra clinica.",
    category: "Bienestar",
    publicationDate: "2026-01-20",
    author: "Alicia Martin Perez",
    metaDescription:
      "Beneficios del Pilates en suelo para la rehabilitacion de lesiones. Clases impartidas por fisioterapeutas en Multifido.",
    content: post4Content,
  },
];

async function run() {
  console.log("Starting blog posts migration...\n");

  for (const post of blogPosts) {
    const pageData = {
      title: h1(post.title),
      excerpt: post.excerpt,
      category: post.category,
      publication_date: post.publicationDate,
      author: post.author,
      meta_title: `${post.title} | Blog Multifido`,
      meta_description: post.metaDescription,
      slices: [
        {
          slice_type: "rich_text",
          slice_label: null,
          variation: "default",
          version: "sktwi1xtmkfgx8626",
          primary: {
            content: post.content,
          },
          items: [],
        },
      ],
    };

    try {
      let existingDoc;
      try {
        existingDoc = await readClient.getByUID("blog_post" as any, post.uid);
        console.log(`Found existing "${post.uid}" document, updating...`);
      } catch {
        console.log(
          `No existing "${post.uid}" document found, creating...`,
        );
      }

      if (existingDoc) {
        existingDoc.data = pageData as any;
        migration.updateDocument(existingDoc, `Blog - ${post.title}`);
      } else {
        migration.createDocument(
          {
            type: "blog_post" as any,
            uid: post.uid,
            lang: "en-us",
            data: pageData,
          },
          `Blog - ${post.title}`,
        );
      }
    } catch (error) {
      console.error(`Error processing "${post.uid}":`, error);
    }
  }

  try {
    await writeClient.migrate(migration, {
      reporter: (event) => console.log(JSON.stringify(event)),
    });
    console.log("\nBlog migration completed successfully!");
    console.log(
      "Check your Prismic dashboard at https://multifidofyr.prismic.io",
    );
    console.log(
      "\nNote: Posts are created as drafts. Remember to add featured images and publish them in the Prismic dashboard.",
    );
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
