import * as prismic from "@prismicio/client";

const REPO_NAME = "multifidofyr";
const WRITE_TOKEN = process.env.PRISMIC_WRITE_TOKEN;

if (!WRITE_TOKEN) {
  console.error("Error: PRISMIC_WRITE_TOKEN env var is required.");
  console.error(
    "Usage: PRISMIC_WRITE_TOKEN=<token> npx tsx scripts/migrate-legal.ts"
  );
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
const li = (text: string) => ({
  type: "list-item" as const,
  text,
  spans: [],
});

// =============================================================================
// POLITICA DE PRIVACIDAD
// =============================================================================
const privacidadContent = [
  h2("Politica de Privacidad"),
  p(
    "El Titular le informa sobre su Politica de Privacidad respecto del tratamiento y proteccion de los datos de caracter personal de los usuarios que puedan ser recabados durante la navegacion a traves del Sitio Web: https://multifidofyr.com"
  ),
  p(
    "En este sentido, el Titular garantiza el cumplimiento de la normativa vigente en materia de proteccion de datos personales, reflejada en la Ley Organica 3/2018, de 5 de diciembre, de Proteccion de Datos Personales y de Garantia de Derechos Digitales (LOPD GDD). Cumple tambien con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la proteccion de las personas fisicas (RGPD)."
  ),
  p(
    "El uso de sitio Web implica la aceptacion de esta Politica de Privacidad asi como las condiciones incluidas en el Aviso Legal."
  ),

  h3("Identidad del Responsable"),
  li("Responsable: Multifido Fisioterapia & Readaptacion."),
  li("NIF: 03207580T"),
  li(
    "Domicilio: Calle Valdemoro, 11. 28914 Leganes, Madrid - Espana."
  ),
  li("Correo electronico: multifidofyr@gmail.com"),
  li("Telefono de contacto: 604940941"),
  li("Sitio Web: https://multifidofyr.com"),

  h3("Principios aplicados en el tratamiento de datos"),
  p(
    "En el tratamiento de sus datos personales, el Titular aplicara los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de proteccion de datos (RGPD):"
  ),
  li(
    "Principio de licitud, lealtad y transparencia: El Titular siempre requerira el consentimiento para el tratamiento de los datos personales que puede ser para uno o varios fines especificos sobre los que el Titular informara al Usuario previamente con absoluta transparencia."
  ),
  li(
    "Principio de minimizacion de datos: El Titular solicitara solo los datos estrictamente necesarios para el fin o los fines que los solicita."
  ),
  li(
    "Principio de limitacion del plazo de conservacion: El Titular mantendra los datos personales recabados durante el tiempo estrictamente necesario para el fin o los fines del tratamiento. El Titular informara al Usuario del plazo de conservacion correspondiente segun la finalidad. En el caso de suscripciones, el Titular revisara periodicamente las listas y eliminara aquellos registros inactivos durante un tiempo considerable."
  ),
  li(
    "Principio de integridad y confidencialidad: Los datos personales recabados seran tratados de tal manera que su seguridad, confidencialidad e integridad esta garantizada. El Titular toma las precauciones necesarias para evitar el acceso no autorizado o uso indebido de los datos de sus usuarios por parte de terceros."
  ),

  h3("Obtencion de datos personales"),
  p(
    "Para navegar por el sitio Web no es necesario que facilite ningun dato personal."
  ),
  p(
    "Los casos en los que usted si proporciona sus datos personales son los siguientes:"
  ),
  li(
    "Al contactar a traves de los formularios de contacto o enviar un correo electronico."
  ),

  h3("Derechos"),
  p(
    "El Titular le informa que sobre sus datos personales tiene derecho a:"
  ),
  li("Solicitar el acceso a los datos almacenados."),
  li("Solicitar una rectificacion o la supresion."),
  li("Solicitar la limitacion de su tratamiento."),
  li("Oponerse al tratamiento."),
  p("No puede ejercitar el derecho a la portabilidad de los datos."),
  p(
    "El ejercicio de estos derechos es personal y por tanto debe ser ejercido directamente por el interesado, solicitandolo directamente al Titular, lo que significa que cualquier cliente, suscriptor o colaborador que haya facilitado sus datos en algun momento, puede dirigirse al Titular y pedir informacion sobre los datos que tiene almacenados y como los ha obtenido, solicitar la rectificacion de los mismos, oponerse al tratamiento, limitar su uso o solicitar la supresion de esos datos en los ficheros del Titular."
  ),
  p(
    "Para ejercitar sus derechos tiene que enviar su peticion junto con una fotocopia del Documento Nacional de Identidad o equivalente a la direccion de correo electronico: multifidofyr@gmail.com"
  ),
  p(
    "El ejercicio de estos derechos no incluye ningun dato que el Titular este obligado a conservar con fines administrativos, legales o de seguridad."
  ),
  p(
    "Tiene derecho a la tutela judicial efectiva y a presentar una reclamacion ante la autoridad de control, en este caso, la Agencia Espanola de Proteccion de Datos, si considera que el tratamiento de datos personales que le conciernen infringe el Reglamento."
  ),

  h3("Finalidad del tratamiento de datos personales"),
  p(
    "Cuando usted se conecta al Sitio Web para mandar un correo al Titular, se suscribe a su boletin esta facilitando informacion de caracter personal de la que el responsable es el Titular. Esta informacion puede incluir datos de caracter personal como pueden ser su direccion IP, nombre y apellidos, direccion fisica, direccion de correo electronico, numero de telefono, y otra informacion. Al facilitar esta informacion, da su consentimiento para que su informacion sea recopilada, utilizada, gestionada y almacenada por el Titular solo como se describe en las paginas: Aviso Legal y Politica de Privacidad."
  ),
  p(
    "Los datos personales y la finalidad del tratamiento por parte del Titular es diferente segun el sistema de captura de informacion:"
  ),
  li(
    "Formularios de contacto: El Titular solicita datos personales entre los que pueden estar: nombre y apellidos, direccion de correo electronico, numero de telefono y direccion de sitio web con la finalidad de responder las consultas de los Usuarios."
  ),
  p(
    "Existen otras finalidades por las que el Titular trata datos personales:"
  ),
  li(
    "Para garantizar el cumplimiento de las condiciones recogidas en la pagina de Aviso Legal y de la ley aplicable."
  ),
  li(
    "Para apoyar y mejorar los servicios que ofrece este Sitio Web."
  ),
  li(
    "Para gestionar las redes sociales. El Titular tiene presencia en redes sociales. Si usted se hace seguidor en las redes sociales del Titular el tratamiento de los datos personales se regira por este apartado, asi como por aquellas condiciones de uso, politicas de privacidad y normativas de acceso que pertenezcan a la red social que proceda en cada caso y que ha aceptado previamente. El Titular tratara sus datos personales con la finalidad de administrar correctamente su presencia en la red social, informarle de sus actividades, asi como para cualquier otra finalidad que las normativas de las redes sociales permiten. En ningun caso el Titular utilizara los perfiles de seguidores en redes sociales para enviar publicidad de manera individual."
  ),

  h3("Seguridad de los datos personales"),
  p(
    "Para proteger sus datos personales, el Titular toma todas las precauciones razonables y sigue las mejores practicas de la industria para evitar su perdida, mal uso, acceso indebido, divulgacion, alteracion o destruccion de los mismos."
  ),
  p(
    "El Titular informa al Usuario de que sus datos personales no seran cedidos a terceras organizaciones, con la salvedad de que dicha cesion de datos este amparada en una obligacion legal o cuando la prestacion de un servicio implique la necesidad de una relacion contractual con un encargado de tratamiento. En este ultimo caso, solo se llevara a cabo la cesion de datos al tercero cuando el Titular disponga del consentimiento expreso del Usuario."
  ),
  p(
    "Sin embargo, en algunos casos se pueden realizar colaboraciones con otros profesionales, en esos casos, se requerira consentimiento al Usuario informando sobre la identidad del colaborador y la finalidad de la colaboracion. Siempre se realizara con los mas estrictos estandares de seguridad."
  ),

  h3("Contenido de otros sitios web"),
  p(
    "Las paginas de este sitio Web pueden incluir contenido incrustado (por ejemplo, videos, imagenes, articulos, etc.). El contenido incrustado de otras web se comporta exactamente de la misma manera que si hubiera visitado la otra web."
  ),
  p(
    "Estos sitios Web pueden recopilar datos sobre usted, utilizar cookies, incrustar un codigo de seguimiento adicional de terceros, y supervisar su interaccion usando este codigo."
  ),

  h3("Legitimacion para el tratamiento de datos"),
  p("La base legal para el tratamiento de sus datos es:"),
  li("El consentimiento del interesado."),

  h3("Categorias de datos personales"),
  p(
    "Las categorias de datos personales que trata el Titular son:"
  ),
  li("Datos identificativos."),
  li(
    "No se tratan categorias de datos especialmente protegidos."
  ),

  h3("Conservacion de datos personales"),
  p(
    "Los datos personales proporcionados al Titular se conservaran hasta que solicite su supresion."
  ),

  h3("Navegacion Web"),
  p(
    "Al navegar por el Sitio Web se pueden recoger datos no identificativos, que pueden incluir, la direccion IP, geolocalizacion, un registro de como se utilizan los servicios y sitios, habitos de navegacion y otros datos que no pueden ser utilizados para identificarle."
  ),
  p(
    "El Titular utiliza la informacion obtenida para obtener datos estadisticos, analizar tendencias, administrar el sitio, estudiar patrones de navegacion y para recopilar informacion demografica."
  ),
  p(
    "El Titular no se hace responsable del tratamiento de los datos personales que realicen las paginas web a las que pueda acceder a traves de los distintos enlaces que contiene el Sitio Web."
  ),

  h3("Exactitud y veracidad de los datos personales"),
  p(
    "Usted se compromete a que los datos facilitados al Titular sean correctos, completos, exactos y vigentes, asi como a mantenerlos debidamente actualizados."
  ),
  p(
    "Como Usuario del Sitio Web es el unico responsable de la veracidad y correccion de los datos remitidos al Sitio Web exonerando al Titular de cualquier responsabilidad al respecto."
  ),

  h3("Aceptacion y consentimiento"),
  p(
    "Como Usuario del Sitio Web declara haber sido informado de las condiciones sobre proteccion de datos de caracter personal, acepta y consiente el tratamiento de los mismos por parte del Titular en la forma y para las finalidades indicadas en esta Politica de Privacidad."
  ),

  h3("Cambios en la Politica de Privacidad"),
  p(
    "El Titular se reserva el derecho a modificar la presente Politica de Privacidad para adaptarla a novedades legislativas o jurisprudenciales, asi como a practicas de la industria."
  ),
  p(
    "Estas politicas estaran vigentes hasta que sean modificadas por otras debidamente publicadas."
  ),
];

// =============================================================================
// POLITICA DE COOKIES
// =============================================================================
const cookiesContent = [
  h2("Politica de Cookies (UE)"),
  p(
    "Esta politica de cookies fue actualizada por ultima vez el junio 10, 2025 y se aplica a los ciudadanos y residentes legales permanentes del Espacio Economico Europeo y Suiza."
  ),

  h3("1. Introduccion"),
  p(
    'Nuestra web, https://multifidofyr.com (en adelante: "la web") utiliza cookies y otras tecnologias relacionadas (para mayor comodidad, todas las tecnologias se denominan "cookies"). Las cookies tambien son colocadas por terceros a los que hemos contratado. En el siguiente documento te informamos sobre el uso de cookies en nuestra web.'
  ),

  h3("2. Que son las cookies"),
  p(
    "Una cookie es un pequeno archivo que se envia junto con las paginas de esta web y que tu navegador almacena en el disco duro de su ordenador u otro dispositivo. La informacion almacenada puede ser devuelta a nuestros servidores o a los servidores de terceros apropiados durante una visita posterior."
  ),

  h3("3. Que son los scripts"),
  p(
    "Un script es un fragmento de codigo de programa que se utiliza para hacer que nuestra web funcione correctamente y de forma interactiva. Este codigo se ejecuta en nuestro servidor o en tu dispositivo."
  ),

  h3("4. Que es una baliza web"),
  p(
    "Una baliza web (o una etiqueta de pixel) es una pequena e invisible pieza de texto o imagen en una web que se utiliza para monitorear el trafico en una web. Para ello, se almacenan varios datos sobre usted mediante estas balizas web."
  ),

  h3("5. Tipos de cookies"),
  p(
    "Cookies tecnicas o funcionales: Algunas cookies aseguran que ciertas partes de la web funcionen correctamente y que tus preferencias de usuario sigan recordandose. Al colocar cookies funcionales, te facilitamos la visita a nuestra web. Podemos colocar estas cookies sin tu consentimiento."
  ),
  p(
    "Cookies de marketing y seguimiento: Las cookies de marketing/seguimiento son cookies, o cualquier otra forma de almacenamiento local, usadas para crear perfiles de usuario para mostrar publicidad o para hacer el seguimiento del usuario en esta web o en varias webs con fines de marketing similares."
  ),

  h3("6. Cookies usadas"),
  p(
    "Complianz (Funcional): Gestion del consentimiento de cookies. Cookies: cmplz_banner-status, cmplz_consented_services, cmplz_policy_id, cmplz_marketing, cmplz_statistics, cmplz_preferences, cmplz_functional. Caducidad: 365 dias."
  ),
  p(
    "Google Analytics (Estadisticas): Estadisticas del sitio web. Cookies: _ga (2 anos), _ga_* (1 ano). Funcion: Contar y rastrear paginas vistas."
  ),
  p(
    "Google reCAPTCHA (Marketing): Prevencion de spam. Cookies: rc::c, rc::b (sesion), rc::a (persistente). Funcion: Filtrar solicitudes de bots."
  ),
  p(
    "Google Fonts (Marketing): Mostrar fuentes web. Solicita la direccion IP del usuario."
  ),
  p(
    "Google Maps (Marketing): Mostrar mapas. Solicita la direccion IP del usuario."
  ),

  h3("7. Consentimiento"),
  p(
    'Cuando visites nuestra web por primera vez, te mostraremos una ventana emergente con una explicacion sobre las cookies. Tan pronto como hagas clic en "Guardar preferencias", aceptas que usemos las categorias de cookies y plugins que has seleccionado en la ventana emergente, tal y como se describe en esta politica de cookies. Puedes desactivar el uso de cookies a traves de tu navegador, pero, por favor, ten en cuenta que nuestra web puede dejar de funcionar correctamente.'
  ),

  h3("8. Activacion, desactivacion y borrado de cookies"),
  p(
    "Puedes utilizar tu navegador de Internet para eliminar las cookies de forma automatica o manual. Tambien puedes especificar que ciertas cookies no pueden ser colocadas. Otra opcion es cambiar los ajustes de tu navegador de Internet para que recibas un mensaje cada vez que se coloca una cookie."
  ),
  p(
    "Ten en cuenta que nuestra web puede no funcionar correctamente si todas las cookies estan desactivadas. Si borras las cookies de tu navegador, se volveran a colocar despues de tu consentimiento cuando vuelvas a visitar nuestras webs."
  ),

  h3("9. Tus derechos con respecto a los datos personales"),
  p(
    "Tienes los siguientes derechos con respecto a tus datos personales:"
  ),
  li(
    "Tiene derecho a saber por que se necesitan tus datos personales, que sucedera con ellos y durante cuanto tiempo se conservaran."
  ),
  li(
    "Derecho de acceso: tienes derecho a acceder a tus datos personales que conocemos."
  ),
  li(
    "Derecho de rectificacion: tienes derecho a completar, rectificar, borrar o bloquear tus datos personales cuando lo desees."
  ),
  li(
    "Si nos das tu consentimiento para procesar tus datos, tienes derecho a revocar dicho consentimiento y a que se eliminen tus datos personales."
  ),
  li(
    "Derecho de cesion de tus datos: tienes derecho a solicitar todos tus datos personales al responsable del tratamiento y a transferirlos integramente a otro responsable del tratamiento."
  ),
  li(
    "Derecho de oposicion: puedes oponerte al tratamiento de tus datos. Nosotros cumplimos con esto, a menos que existan motivos justificados para el procesamiento."
  ),
  p(
    "Para ejercer estos derechos, por favor, contacta con nosotros. Si tienes alguna queja sobre como gestionamos tus datos, tambien tienes derecho a enviar una queja a la Agencia Espanola de Proteccion de Datos."
  ),

  h3("10. Datos de contacto"),
  p(
    "Para preguntas y/o comentarios sobre nuestra politica de cookies y esta declaracion, por favor, contacta con nosotros:"
  ),
  p(
    "Multifido Fisioterapia & Readaptacion. Calle Valdemoro, 11. 28914 Leganes, Madrid, Espana. Correo electronico: multifidofyr@gmail.com. Sitio Web: https://multifidofyr.com"
  ),
];

// =============================================================================
// AVISO LEGAL
// =============================================================================
const avisoLegalContent = [
  h2("Aviso Legal"),

  h3("Identificacion y Titularidad"),
  li("Titular: Multifido Fisioterapia & Readaptacion"),
  li("NIF: 03207580T"),
  li(
    "Domicilio: Calle Valdemoro, 11. 28914 Leganes, Madrid - Espana"
  ),
  li("Correo electronico: multifidofyr@gmail.com"),
  li("Telefono: 604940941"),
  li("Sitio Web: https://multifidofyr.com"),

  h3("Finalidad"),
  p(
    "La finalidad del sitio Web https://multifidofyr.com es proporcionar informacion sobre los servicios de fisioterapia y readaptacion deportiva ofrecidos por Multifido Fisioterapia & Readaptacion."
  ),

  h3("Condiciones de Uso"),
  p(
    "La utilizacion del sitio Web le otorga la condicion de Usuario, e implica la aceptacion completa de todas las clausulas y condiciones de uso incluidas en las paginas: Aviso Legal, Politica de Privacidad y Politica de Cookies."
  ),
  p(
    "Si no estuviera conforme con todas y cada una de estas clausulas y condiciones abstenerse de utilizar este sitio Web."
  ),
  p(
    "El acceso a este sitio Web no supone, en modo alguno, el inicio de una relacion comercial con el Titular."
  ),
  p(
    "A tal efecto, usted esta obligado y comprometido a NO utilizar cualquiera de los contenidos del sitio Web con fines o efectos ilicitos, prohibidos en este Aviso Legal o por la legislacion vigente, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan danar, inutilizar, sobrecargar, deteriorar o impedir la normal utilizacion de los contenidos, los equipos informaticos o los documentos, archivos y toda clase de contenidos almacenados en cualquier equipo informatico propios o contratados por el Titular, de otros Usuarios o de cualquier usuario de Internet."
  ),

  h3("Medidas de seguridad"),
  p(
    "Los datos personales comunicados por el Usuario al Titular pueden ser almacenados en bases de datos automatizadas o no, cuya titularidad corresponde en exclusiva al Titular, asumiendo este todas las medidas de indole tecnica, organizativa y de seguridad que garantizan la confidencialidad, integridad y calidad de la informacion contenida en las mismas de acuerdo con lo establecido en la normativa vigente en proteccion de datos."
  ),
  p(
    "La comunicacion entre los usuarios y el Titular utiliza un canal seguro, y los datos transmitidos son cifrados gracias a protocolos HTTPS, por tanto, garantizamos las mejores condiciones de seguridad para que la confidencialidad de los usuarios este garantizada."
  ),

  h3("Contenidos"),
  p(
    "El Titular se reserva el derecho de actualizar, modificar o eliminar la informacion contenida en su sitio Web, asi como su configuracion o presentacion, en cualquier momento sin asumir responsabilidad alguna por ello."
  ),
  p(
    "El Titular no asume responsabilidad alguna por la informacion contenida en sitios Web de terceros a los que se pueda acceder por enlaces desde el sitio Web del Titular."
  ),
  p(
    "Los contenidos de esta web tienen unicamente una finalidad informativa, por lo que no pueden en ningun caso ser considerados como una oferta de compra, venta o intercambio, ni generar derechos ni obligaciones."
  ),

  h3("Politica de Cookies"),
  p(
    "El Titular puede utilizar cookies para recopilar y almacenar informacion. La informacion recopilada puede incluir: nombre de dominio del proveedor de acceso a Internet, direccion IP del ordenador del usuario, fecha y hora de acceso al sitio web, paginas visitadas, direccion de Internet desde la cual el usuario accedio al sitio web y estadisticas de los visitantes. Esta informacion es totalmente anonima y no puede asociarse a una persona concreta."
  ),

  h3("Enlaces a otros sitios Web"),
  p(
    "El Titular puede proporcionar al Usuario enlaces a otros sitios Web. Dado que el Titular no tiene ningun control sobre dichos sitios, no asume ningun tipo de responsabilidad por el contenido de estos sitios. El acceso a las webs de terceros por medio de los enlaces no implica ninguna relacion entre el Titular y el titular del sitio web vinculado, ni la aceptacion o aprobacion por parte del Titular de sus contenidos o servicios."
  ),

  h3("Propiedad Intelectual e Industrial"),
  p(
    "Todos los derechos estan reservados. Todo acceso a este sitio Web esta sujeto a las siguientes condiciones: la reproduccion, almacenaje permanente y la difusion de los contenidos o cualquier otro uso que tenga finalidad publica o comercial queda expresamente prohibida sin el consentimiento previo y por escrito del Titular."
  ),

  h3("Limitacion de responsabilidad"),
  p(
    "El Titular no declara ni garantiza que los servicios o contenidos sean interrumpidos o que esten libres de errores, que los defectos seran corregidos, o que el servicio o el servidor que lo pone a disposicion esten libres de virus u otros componentes nocivos sin perjuicio de que el Titular realiza todos los esfuerzos en evitar este tipo de incidentes."
  ),
  p(
    "El Titular declina cualquier responsabilidad en caso de que existan interrupciones o un mal funcionamiento de los Servicios o contenidos ofrecidos en Internet, cualquiera que sea su causa. Asimismo, el Titular no se hace responsable por caidas de la red, perdidas de negocio a consecuencia de dichas caidas, suspensiones temporales del fluido electrico o cualquier otro tipo de dano indirecto que te pueda ser causado por causas ajenas al Titular."
  ),

  h3("Jurisdiccion"),
  p(
    "Este Aviso Legal se rige integramente por la legislacion espanola."
  ),

  h3("Contacto"),
  p(
    "En caso de que usted tenga cualquier duda acerca de estas condiciones legales o quiera realizar cualquier comentario sobre este sitio Web, puede enviar un mensaje de correo electronico a la direccion: multifidofyr@gmail.com"
  ),
];

// =============================================================================
// PAGE DEFINITIONS
// =============================================================================
const legalPages = [
  {
    uid: "politica-de-privacidad",
    title: "Politica de Privacidad",
    metaDescription:
      "Politica de privacidad de Multifido Fisioterapia & Readaptacion. Informacion sobre el tratamiento de datos personales.",
    content: privacidadContent,
  },
  {
    uid: "politica-de-cookies",
    title: "Politica de Cookies",
    metaDescription:
      "Politica de cookies de Multifido Fisioterapia & Readaptacion. Informacion sobre el uso de cookies en nuestro sitio web.",
    content: cookiesContent,
  },
  {
    uid: "aviso-legal",
    title: "Aviso Legal",
    metaDescription:
      "Aviso legal de Multifido Fisioterapia & Readaptacion. Condiciones de uso, propiedad intelectual y limitacion de responsabilidad.",
    content: avisoLegalContent,
  },
];

async function run() {
  console.log("Starting legal pages migration...\n");

  for (const page of legalPages) {
    const pageData = {
      title: h1(page.title),
      meta_title: `${page.title} | Multifido Fisioterapia`,
      meta_description: page.metaDescription,
      slices: [
        {
          slice_type: "rich_text",
          slice_label: null,
          variation: "default",
          version: "sktwi1xtmkfgx8626",
          primary: {
            content: page.content,
          },
          items: [],
        },
      ],
    };

    try {
      let existingDoc;
      try {
        existingDoc = await readClient.getByUID("page", page.uid);
        console.log(`Found existing "${page.uid}" document, updating...`);
      } catch {
        console.log(
          `No existing "${page.uid}" document found, creating...`
        );
      }

      if (existingDoc) {
        existingDoc.data = pageData as typeof existingDoc.data;
        migration.updateDocument(
          existingDoc,
          `Multifido - ${page.title}`
        );
      } else {
        migration.createDocument(
          {
            type: "page",
            uid: page.uid,
            lang: "en-us",
            data: pageData,
          },
          `Multifido - ${page.title}`
        );
      }
    } catch (error) {
      console.error(`Error processing "${page.uid}":`, error);
    }
  }

  try {
    await writeClient.migrate(migration, {
      reporter: (event) => console.log(JSON.stringify(event)),
    });
    console.log("\nLegal pages migration completed successfully!");
    console.log(
      "Check your Prismic dashboard at https://multifidofyr.prismic.io"
    );
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
