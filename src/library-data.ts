export interface LibraryPrompt {
  title: string;
  desc: string;
  tool: 'Claude' | 'ChatGPT' | 'Gemini';
  tags: string[];
  prompt: string;
}

export interface LibraryRole {
  role: string;
  prompts: LibraryPrompt[];
}

export const LIBRARY_DATA: LibraryRole[] = [
  {
    role: 'Community',
    prompts: [
      {
        title: 'Calendario de contenido mensual',
        desc: 'Genera un plan editorial completo con temáticas, formatos y CTAs para un mes.',
        tool: 'Claude',
        tags: ['Planificación', 'Redes sociales'],
        prompt: `Actuá como estratega de contenido para redes sociales. El cliente es [NOMBRE DEL CLIENTE], una marca de [INDUSTRIA] cuya audiencia principal es [DESCRIPCIÓN DE AUDIENCIA]. El objetivo del mes es [OBJETIVO: awareness / engagement / conversión].

Generá un calendario de contenido para [MES] con 20 publicaciones distribuidas entre Instagram, LinkedIn y TikTok. Para cada post incluí: fecha sugerida, plataforma, formato (carrusel / reels / estático / texto), tema, gancho de apertura y CTA. Tono: [TONO DE MARCA]. Evitá clichés como "en el mundo actual" o "en este contexto".

Formato de respuesta: tabla con columnas: Fecha | Plataforma | Formato | Tema | Gancho | CTA.`,
      },
      {
        title: 'Respuesta a comentario negativo',
        desc: 'Redactá respuestas empáticas y profesionales a críticas en redes.',
        tool: 'Claude',
        tags: ['Community', 'Crisis'],
        prompt: `Actuá como community manager senior de una marca de [INDUSTRIA]. Recibiste el siguiente comentario negativo en [PLATAFORMA]:

"[PEGAR COMENTARIO]"

Redactá una respuesta pública que: reconozca la experiencia del usuario sin validar acusaciones falsas, muestre disposición a resolver, derive a un canal privado si corresponde, y mantenga el tono de la marca ([TONO: formal / cercano / neutro]).

Máximo 3 oraciones. Sin frases corporativas vacías. Sin sobreprometer.`,
      },
      {
        title: '10 hooks para Instagram',
        desc: 'Generá ganchos de apertura con alta retención para posts de IG.',
        tool: 'ChatGPT',
        tags: ['Copy', 'Instagram'],
        prompt: `Actuá como copywriter especializado en contenido para Instagram. El cliente es [CLIENTE], vende [PRODUCTO/SERVICIO], y habla a [AUDIENCIA].

Generá 10 hooks de apertura para posts de Instagram que paren el scroll. Cada hook debe tener máximo 2 líneas, generar curiosidad, promesa o tensión. Variá entre estos formatos: pregunta, dato sorpresa, afirmación polémica, historia corta, contradicción.

No uses emojis al inicio. No empieces con "¿Sabías que...". Devolvé solo los 10 hooks numerados, sin explicación adicional.`,
      },
      {
        title: 'Análisis de métricas para reporte',
        desc: 'Interpretá métricas de redes y generá un resumen ejecutivo para el cliente.',
        tool: 'Gemini',
        tags: ['Reportes', 'Análisis'],
        prompt: `Actuá como analista de social media. Tengo los siguientes datos de rendimiento del mes [MES] para el cliente [CLIENTE]:

[PEGAR MÉTRICAS: alcance, impresiones, engagement, seguidores nuevos, publicaciones, clicks]

Generá un resumen ejecutivo de máximo 200 palabras con: 3 logros destacados, 2 áreas de mejora y 1 recomendación de acción concreta para el próximo mes. Tono: profesional pero accesible. El cliente no es técnico.`,
      },
    ],
  },
  {
    role: 'Planners',
    prompts: [
      {
        title: 'Brief estratégico de campaña',
        desc: 'Convertí un pedido informal del cliente en un brief estructurado y accionable.',
        tool: 'Claude',
        tags: ['Estrategia', 'Briefing'],
        prompt: `Actuá como planner estratégico senior. El cliente [CLIENTE] me envió el siguiente pedido informal:

"[PEGAR EL MENSAJE O PEDIDO DEL CLIENTE]"

Convertilo en un brief estratégico estructurado que incluya: objetivo de negocio, objetivo de comunicación, audiencia primaria y secundaria, insight clave, propuesta de valor, tono y personalidad, canales sugeridos, KPIs de éxito y restricciones o consideraciones.

Si hay información que falta, marcala como [PENDIENTE CONFIRMAR CON CLIENTE]. No inventes datos. Formato: documento con encabezados.`,
      },
      {
        title: 'Análisis de competencia express',
        desc: 'Mapeá el posicionamiento y comunicación de los competidores principales.',
        tool: 'ChatGPT',
        tags: ['Research', 'Competencia'],
        prompt: `Actuá como planner estratégico. Necesito un análisis de competencia para [MARCA DEL CLIENTE] en el mercado de [INDUSTRIA/CATEGORÍA] en [PAÍS/REGIÓN].

Analizá los siguientes 3 competidores: [COMPETIDOR 1], [COMPETIDOR 2], [COMPETIDOR 3].

Para cada uno indicá: propuesta de valor principal, tono de comunicación, canales activos, tipo de contenido predominante, público evidente y 1 debilidad perceptible.

Al final incluí: 1 oportunidad de diferenciación para [MARCA DEL CLIENTE] basada en los gaps detectados. Formato: tabla comparativa + párrafo de oportunidad.`,
      },
      {
        title: 'Definición de audiencia y persona',
        desc: 'Construí un perfil de audiencia detallado para guiar la estrategia de comunicación.',
        tool: 'Claude',
        tags: ['Estrategia', 'Audiencia'],
        prompt: `Actuá como planner estratégico y especialista en comportamiento del consumidor. El cliente es [CLIENTE], una marca de [INDUSTRIA] con el siguiente producto/servicio: [DESCRIPCIÓN BREVE].

Construí 2 perfiles de audiencia (buyer personas) con los siguientes campos para cada uno: nombre y edad representativa, ocupación y nivel socioeconómico, motivaciones de compra, barreras o miedos, canales de información que consume, cómo toma decisiones de compra y qué mensaje le resuena.

Basate en patrones reales del mercado latinoamericano. No uses nombres genéricos como "María la ama de casa". Hacelos específicos y creíbles.`,
      },
      {
        title: 'Propuesta de campaña 360',
        desc: 'Estructurá una propuesta completa de campaña para presentar al cliente.',
        tool: 'Claude',
        tags: ['Propuesta', 'Campaña'],
        prompt: `Actuá como director de estrategia creativa. El cliente [CLIENTE] necesita una campaña para [OBJETIVO: lanzamiento / temporada / branding / performance] con un presupuesto aproximado de [PRESUPUESTO] y duración de [TIEMPO].

Generá la estructura de una propuesta de campaña 360 que incluya: concepto creativo central (en una frase), territorios de comunicación (3 máximo), canales y formatos recomendados, fases de la campaña, distribución de presupuesto estimada por canal y métricas de éxito por fase.

Tono de la propuesta: profesional, confiante. Evitá jerga excesiva. El cliente debe poder entenderla sin ser especialista.`,
      },
    ],
  },
  {
    role: 'Traffickers',
    prompts: [
      {
        title: 'Estructura de campaña en Meta Ads',
        desc: 'Definí la arquitectura óptima de campaña, adset y anuncio para un objetivo específico.',
        tool: 'ChatGPT',
        tags: ['Meta Ads', 'Paid Media'],
        prompt: `Actuá como especialista en paid media con foco en Meta Ads. Voy a lanzar una campaña para [CLIENTE] con el siguiente objetivo: [OBJETIVO: conversión / tráfico / awareness / leads].

Producto/servicio: [DESCRIPCIÓN]. Presupuesto mensual: [MONTO]. Audiencia estimada: [DESCRIPCIÓN DE AUDIENCIA]. Duración: [TIEMPO].

Diseñá la arquitectura completa de la campaña: estructura de campaña / adsets / anuncios, segmentaciones recomendadas por adset, tipos de creatividades sugeridas por formato, estrategia de puja, configuración de píxel y eventos a trackear. Incluí recomendaciones de testing A/B para la primera semana.`,
      },
      {
        title: 'Análisis de resultados y optimización',
        desc: 'Interpretá el rendimiento de una campaña activa y definí acciones de optimización.',
        tool: 'Gemini',
        tags: ['Optimización', 'Análisis'],
        prompt: `Actuá como media buyer senior. Tengo una campaña activa de [META ADS / GOOGLE ADS / TIKTOK ADS] con los siguientes resultados después de [X días]:

[PEGAR MÉTRICAS: impresiones, alcance, CTR, CPC, CPM, conversiones, CPA, ROAS si aplica]

El objetivo original era [OBJETIVO] con un CPA meta de [VALOR].

Analizá los datos, identificá qué está funcionando y qué no, y dame un plan de optimización concreto con: 3 acciones inmediatas (próximas 48hs), 2 acciones de mediano plazo y 1 hipótesis de test para validar la próxima semana.`,
      },
      {
        title: 'Estrategia de remarketing',
        desc: 'Diseñá una estrategia de remarketing segmentada por etapa del funnel.',
        tool: 'Claude',
        tags: ['Remarketing', 'Funnel'],
        prompt: `Actuá como especialista en performance digital. El cliente [CLIENTE] vende [PRODUCTO/SERVICIO] y tiene los siguientes públicos de remarketing disponibles: visitantes del sitio web, abandono de carrito (si aplica), leads captados, clientes actuales.

Diseñá una estrategia de remarketing segmentada que incluya: audiencias a crear por etapa del funnel, mensaje clave para cada audiencia, formato de anuncio recomendado, frecuencia sugerida y exclusiones necesarias para no impactar donde no corresponde.

Plataforma principal: [META / GOOGLE / AMBAS]. Presupuesto disponible para remarketing: [MONTO o % del total].`,
      },
      {
        title: 'Copy para anuncios pagos',
        desc: 'Generá variantes de copy para testear en campañas de paid media.',
        tool: 'ChatGPT',
        tags: ['Copy', 'Ads'],
        prompt: `Actuá como copywriter especializado en performance advertising. El cliente es [CLIENTE], vende [PRODUCTO/SERVICIO] a [AUDIENCIA], con el siguiente diferencial: [DIFERENCIAL PRINCIPAL].

Generá 3 variantes de copy para anuncios en [META ADS / GOOGLE ADS / TIKTOK]. Para cada variante incluí: headline (máximo 40 caracteres), texto principal (máximo 125 caracteres) y descripción o CTA (máximo 30 caracteres).

Variante 1: enfoque en beneficio emocional. Variante 2: enfoque en resultado concreto/dato. Variante 3: enfoque en urgencia o escasez. Sin emojis. Sin puntos suspensivos. Directo.`,
      },
    ],
  },
  {
    role: 'Copy',
    prompts: [
      {
        title: 'Sistema de tono de marca',
        desc: 'Definí el brand voice de un cliente con ejemplos concretos de cómo suena y cómo no.',
        tool: 'Claude',
        tags: ['Brand Voice', 'Estrategia'],
        prompt: `Actuá como brand strategist y especialista en comunicación de marca. El cliente es [CLIENTE], una [TIPO DE EMPRESA] que vende [PRODUCTO/SERVICIO] a [AUDIENCIA].

Su posicionamiento es: [DESCRIPCIÓN]. Sus valores de marca son: [VALORES].

Construí un sistema de tono de marca que incluya: 4 atributos de personalidad con descripción de una oración cada uno, cómo suena la marca (3 ejemplos de frases reales), cómo NO suena la marca (3 ejemplos de lo que nunca diría), vocabulario clave (10 palabras o frases propias de la marca) y vocabulario prohibido (palabras o frases a evitar siempre).

Formato: documento estructurado, usable como guía de referencia para el equipo.`,
      },
      {
        title: 'Landing page completa',
        desc: 'Escribí todos los bloques de copy para una landing page de conversión.',
        tool: 'Claude',
        tags: ['Landing', 'Conversión'],
        prompt: `Actuá como copywriter de respuesta directa con experiencia en conversión web. Necesito el copy completo para una landing page de [PRODUCTO/SERVICIO] del cliente [CLIENTE].

Audiencia: [DESCRIPCIÓN]. Objetivo de la landing: [CONVERSIÓN ESPERADA: compra / registro / contacto]. Principal objeción del usuario: [OBJECIÓN].

Escribí copy para los siguientes bloques: headline principal + subheadline, propuesta de valor (3 bullets), sección de beneficios (4 items con título + descripción corta), sección de prueba social (estructura para testimonios), sección de FAQ (3 preguntas clave y respuestas) y CTA principal + CTA secundario.

Tono: [TONO]. Sin hipérboles vacías. Cada frase debe ganarse su lugar.`,
      },
      {
        title: 'Email de nurturing para leads',
        desc: 'Secuencia de emails para nutrir leads y llevarlos hacia la conversión.',
        tool: 'Claude',
        tags: ['Email', 'Nurturing'],
        prompt: `Actuá como copywriter especializado en email marketing. El cliente [CLIENTE] captó leads interesados en [PRODUCTO/SERVICIO]. El ciclo de venta es de aproximadamente [TIEMPO].

Escribí una secuencia de 4 emails de nurturing con los siguientes objetivos: Email 1 (día 1): bienvenida + entrega de valor inmediato. Email 2 (día 3): educar sobre el problema que resuelven. Email 3 (día 7): prueba social + caso de uso. Email 4 (día 12): oferta o CTA de conversión.

Para cada email incluí: asunto (3 variantes para testear), preview text, cuerpo del email (máximo 200 palabras) y CTA. Tono: [TONO DE MARCA]. Sin frases genéricas de ventas.`,
      },
      {
        title: 'Variantes de copy para test A/B',
        desc: 'Generá múltiples versiones de un mismo copy para testear qué enfoque convierte mejor.',
        tool: 'ChatGPT',
        tags: ['A/B Testing', 'Copy'],
        prompt: `Actuá como copywriter de performance. Tengo el siguiente copy original para [TIPO DE PIEZA: email / ad / landing]:

"[PEGAR EL COPY ORIGINAL]"

El objetivo es [CONVERSIÓN ESPERADA]. La audiencia es [DESCRIPCIÓN].

Generá 3 variantes del mismo copy cambiando el enfoque de persuasión: Variante A: enfoque emocional (apela a deseo o miedo). Variante B: enfoque racional (datos, lógica, comparación). Variante C: enfoque social (prueba social, pertenencia, validación externa).

Mantené la misma extensión aproximada que el original. Indicá al final qué hipótesis estás testeando con cada variante.`,
      },
    ],
  },
  {
    role: 'Diseñadores',
    prompts: [
      {
        title: 'Brief creativo para diseño',
        desc: 'Traducí un pedido vago del cliente en un brief de diseño claro y accionable.',
        tool: 'Claude',
        tags: ['Brief', 'Proceso'],
        prompt: `Actuá como director de arte. Recibí el siguiente pedido del cliente o del equipo de cuentas:

"[PEGAR EL PEDIDO]"

Traducilo a un brief de diseño estructurado que incluya: objetivo de la pieza, formato y dimensiones, mensaje principal a comunicar, jerarquía visual sugerida (qué debe verse primero, segundo, tercero), referencias de estilo o moodboard (describe 3 referencias sin nombrar marcas competidoras si aplica), restricciones (colores de marca, tipografías, elementos obligatorios) y lo que NO debe aparecer o evitarse.

Si hay ambigüedades en el pedido original, marcalas como [CONFIRMAR] en lugar de asumir.`,
      },
      {
        title: 'Prompt para generación de imagen con IA',
        desc: 'Construí un prompt optimizado para generar imágenes con Midjourney, DALL·E o Firefly.',
        tool: 'ChatGPT',
        tags: ['Generación IA', 'Imagen'],
        prompt: `Actuá como director de arte especializado en generación de imágenes con IA. Necesito crear una imagen para [CONTEXTO: campaña / red social / web / presentación] del cliente [CLIENTE].

La imagen debe mostrar: [DESCRIPCIÓN DEL SUJETO O ESCENA]. Estilo visual: [ESTILO: fotografía editorial / ilustración / 3D render / flat design]. Paleta de colores: [COLORES]. Composición: [PRIMER PLANO / PLANO GENERAL / CENITAL]. Iluminación: [LUZ NATURAL / HORA DORADA / LUZ DE ESTUDIO]. Atmósfera: [EMOCIÓN O SENSACIÓN]. Herramienta destino: [MIDJOURNEY / DALL·E / FIREFLY].

Generá el prompt optimizado para esa herramienta, incluyendo los parámetros técnicos correspondientes (--ar, --style, etc. para Midjourney; o equivalentes). Incluí también los negative prompts recomendados.`,
      },
      {
        title: 'Moodboard conceptual en texto',
        desc: 'Describí un moodboard de dirección creativa para alinear al equipo antes de producir.',
        tool: 'Claude',
        tags: ['Dirección creativa', 'Moodboard'],
        prompt: `Actuá como director de arte creativo. Para el proyecto [NOMBRE DEL PROYECTO] del cliente [CLIENTE], necesito definir la dirección visual antes de empezar a producir piezas.

El brief dice: [RESUMEN DEL BRIEF]. La audiencia es [AUDIENCIA]. El tono es [TONO].

Describí un moodboard conceptual detallado que incluya: 3 palabras clave visuales que guíen todas las decisiones, paleta de colores con descripción de cada tono y su rol emocional, tipografías sugeridas (display + cuerpo + por qué), texturas o elementos gráficos, referencias fotográficas describibles (sin mencionar marcas), y lo que este proyecto definitivamente NO es visualmente.

Formato: documento de dirección creativa, usable para alinear al equipo y al cliente.`,
      },
    ],
  },
  {
    role: 'Creativos',
    prompts: [
      {
        title: 'Concepto creativo de campaña',
        desc: 'Generá ideas de concepto creativo central para una campaña específica.',
        tool: 'Claude',
        tags: ['Concepto', 'Campaña'],
        prompt: `Actuá como director creativo con experiencia en publicidad latinoamericana. El cliente es [CLIENTE], una marca de [INDUSTRIA]. El brief de campaña es:

Objetivo: [OBJETIVO]. Audiencia: [AUDIENCIA]. Insight clave: [INSIGHT]. Mandatorio de comunicación: [LO QUE SÍ DEBE INCLUIRSE]. Restricciones: [LO QUE NO SE PUEDE HACER].

Generá 3 conceptos creativos diferentes para esta campaña. Para cada concepto incluí: nombre del concepto (2-3 palabras), idea central en una oración, cómo se manifiesta en diferentes canales (TV/digital/OOH/redes), tono y estilo, y por qué conecta con el insight.

Los conceptos deben ser distintos entre sí. Evitá lo obvio. El mejor concepto es el que nadie más hubiera pensado pero todos entienden de inmediato.`,
      },
      {
        title: 'Naming y taglines',
        desc: 'Generá opciones de nombre o tagline para producto, campaña o servicio.',
        tool: 'ChatGPT',
        tags: ['Naming', 'Branding'],
        prompt: `Actuá como estratega creativo especializado en naming y branding. Necesito [NOMBRE PARA: producto / campaña / servicio / evento] para [CLIENTE].

Contexto: [DESCRIPCIÓN DE QUÉ ES]. Audiencia: [AUDIENCIA]. Atributos que debe transmitir: [3 ATRIBUTOS]. Tono: [TONO]. Restricciones: [IDIOMA / LONGITUD / LO QUE DEBE EVITARSE].

Generá 10 opciones divididas en 3 categorías: Descriptivos (dicen qué es), Evocativos (generan una sensación o imagen mental), Disruptivos (rompen con la categoría). Para cada nombre incluí en una línea por qué funciona. Al final seleccioná tu top 3 con justificación breve.`,
      },
      {
        title: 'Script para video o reels',
        desc: 'Escribí el guión completo de un video corto con estructura narrativa y dirección de arte.',
        tool: 'Claude',
        tags: ['Video', 'Script'],
        prompt: `Actuá como director creativo y guionista de contenido audiovisual. Necesito el script para un video de [DURACIÓN: 15s / 30s / 60s] para [PLATAFORMA: Instagram Reels / TikTok / YouTube / TV] del cliente [CLIENTE].

Objetivo del video: [OBJETIVO]. Mensaje principal: [MENSAJE]. Tono: [TONO]. Mandatorios: [LOGO / PRODUCTO / FRASE CLAVE QUE DEBE APARECER].

Escribí el script con el siguiente formato para cada escena: Tiempo | Visual (qué se ve) | Audio/Locución (qué se escucha) | Texto en pantalla | Dirección de arte (notas para producción).

El video debe tener gancho en los primeros 3 segundos. Si es para redes, optimizalo para verse sin audio.`,
      },
      {
        title: 'Adaptación de concepto a múltiples formatos',
        desc: 'Tomá un concepto central y adaptalo a todos los formatos y canales de una campaña.',
        tool: 'Claude',
        tags: ['Adaptación', '360°'],
        prompt: `Actuá como director creativo de campaña 360. El concepto central de la campaña es:

"[DESCRIBIR EL CONCEPTO CENTRAL]"

El cliente es [CLIENTE]. La campaña corre en los siguientes canales: [LISTAR CANALES].

Para cada canal generá: cómo se manifiesta el concepto en ese formato, el mensaje específico adaptado, el formato recomendado y las consideraciones técnicas o de producción. Canales a adaptar: post de Instagram (carrusel y estático), Story / Reel, post de LinkedIn, email, banner web y pieza OOH si aplica.

Mantené la coherencia del concepto en todos los formatos sin que ninguno se sienta forzado.`,
      },
    ],
  },
  {
    role: 'Editores de Video',
    prompts: [
      {
        title: 'Prompt para generación de video con IA',
        desc: 'Construí un prompt optimizado para Runway, Kling, Pika u otras herramientas de video IA.',
        tool: 'ChatGPT',
        tags: ['Video IA', 'Generación'],
        prompt: `Actuá como director de arte especializado en generación de video con IA. Necesito crear un clip de video para [CONTEXTO: reel / spot / transición / apertura] del cliente [CLIENTE].

Describí la escena de inicio y fin: [DESCRIPCIÓN]. Movimiento de cámara: [ZOOM IN / PAN / DOLLY / ESTÁTICO / HANDHELD]. Duración: [4-8 segundos recomendado]. Estilo: [CINEMATOGRÁFICO / DOCUMENTAL / PUBLICITARIO / ANIMACIÓN]. Atmósfera: [EMOCIÓN O SENSACIÓN]. Herramienta destino: [RUNWAY / KLING / PIKA / HAILUO].

Generá el prompt optimizado para esa herramienta. Incluí negative prompts. Indicá qué elementos revisar siempre: manos, texto en pantalla, física de elementos naturales (agua, fuego, cabello).`,
      },
      {
        title: 'Estructura narrativa para video editorial',
        desc: 'Definí la estructura de un video editorial o documental corto antes de editar.',
        tool: 'Claude',
        tags: ['Narrativa', 'Editorial'],
        prompt: `Actuá como director y editor de contenido audiovisual. Voy a editar un video de [DURACIÓN] para [CLIENTE] con el siguiente material disponible: [DESCRIBIR EL MATERIAL: entrevistas, b-roll, producto, eventos].

El objetivo del video es [OBJETIVO]. La plataforma principal es [PLATAFORMA]. La audiencia es [AUDIENCIA].

Diseñá la estructura narrativa del video con: gancho de apertura (primeros 3-5 segundos), desarrollo (bloques de contenido con duración estimada), momento de mayor impacto emocional o informativo, y cierre con CTA. Indicá qué tipo de música sugiere la atmósfera y cómo usar el silencio o los cortes como recurso narrativo.`,
      },
      {
        title: 'Guía de estilo para serie de contenido',
        desc: 'Definí los criterios de edición para mantener coherencia visual en una serie de videos.',
        tool: 'Claude',
        tags: ['Estilo', 'Coherencia'],
        prompt: `Actuá como director de post-producción. Voy a producir una serie de [CANTIDAD] videos para [CLIENTE] en [PLATAFORMA]. El estilo de marca es [DESCRIPCIÓN: moderno / cálido / corporativo / dinámico].

Creá una guía de estilo de edición que incluya: ritmo de cortes (tipo de edición y velocidad), uso del color y gradación sugerida, tipografías y estilo de textos en pantalla, uso de música (tipo, energía, momentos clave), transiciones recomendadas y prohibidas, formato de apertura y cierre estándar, y ratio de aspecto y especificaciones técnicas por plataforma.

El objetivo es que cualquier editor del equipo pueda tomar esta guía y mantener la coherencia visual de la serie.`,
      },
    ],
  },
  {
    role: 'Editores de Imagen',
    prompts: [
      {
        title: 'Descripción de retoque y tratamiento fotográfico',
        desc: 'Describí con precisión el tratamiento de imagen para alinear al equipo de retoque.',
        tool: 'Claude',
        tags: ['Retoque', 'Fotografía'],
        prompt: `Actuá como director de fotografía y post-producción. Para el proyecto [NOMBRE] del cliente [CLIENTE], necesito definir el tratamiento de imagen estándar para todas las fotos de la producción.

El estilo de marca es [DESCRIPCIÓN]. La plataforma destino principal es [PLATAFORMA]. Referencias visuales: [DESCRIBIR EL ESTILO DESEADO].

Generá una guía de tratamiento fotográfico que incluya: corrección de color base (temperatura, tinte, exposición), gradación y look deseado (warm / cool / neutro / dramático), nivel de retoque de piel (natural / editorial / publicidad), tratamiento de fondos, elementos que siempre deben removerse, y especificaciones de exportación por formato y plataforma.`,
      },
      {
        title: 'Prompt para edición de imagen con IA',
        desc: 'Construí instrucciones precisas para editar o transformar una imagen con herramientas IA.',
        tool: 'ChatGPT',
        tags: ['Edición IA', 'Imagen'],
        prompt: `Actuá como especialista en edición de imagen con IA. Tengo una foto de [DESCRIPCIÓN DE LA FOTO ORIGINAL] y necesito [DESCRIBIR EL RESULTADO DESEADO].

Herramienta a usar: [ADOBE FIREFLY / DALL·E INPAINT / STABLE DIFFUSION / PHOTOSHOP IA].

Generá las instrucciones precisas para: qué seleccionar o enmascarar, qué prompt usar para la generación o modificación, qué ajustes aplicar después de la generación IA para integrar naturalmente, y cómo verificar que el resultado sea usable comercialmente (sin artefactos, proporcionado, sin marcas de agua).

Incluí negative prompts si la herramienta los acepta.`,
      },
    ],
  },
  {
    role: 'Líderes',
    prompts: [
      {
        title: 'Evaluación de performance del equipo',
        desc: 'Estructurá una evaluación honesta y accionable para una conversación de feedback.',
        tool: 'Claude',
        tags: ['Liderazgo', 'Feedback'],
        prompt: `Actuá como coach ejecutivo especializado en liderazgo de equipos creativos. Voy a tener una conversación de feedback con [NOMBRE/ROL], quien lleva [TIEMPO] en el equipo.

Sus fortalezas observadas son: [LISTAR]. Sus áreas de mejora son: [LISTAR]. Un incidente o situación específica que quiero abordar: [DESCRIBIR].

Ayudame a estructurar la conversación con: apertura no defensiva (cómo abrir sin que se ponga a la defensiva), reconocimiento concreto (qué decir exactamente sobre sus logros), área de mejora con ejemplo específico (sin generalizar), acuerdo de acción concreta (qué le voy a pedir que cambie o mejore) y cierre motivador. Tono: directo, empático, sin rodeos.`,
      },
      {
        title: 'Propuesta interna para nuevo servicio o proceso',
        desc: 'Estructurá una propuesta para presentar internamente un cambio, nuevo servicio o inversión.',
        tool: 'Claude',
        tags: ['Gestión', 'Propuesta'],
        prompt: `Actuá como consultor de operaciones. Quiero presentar internamente la siguiente iniciativa: [DESCRIBIR LA INICIATIVA: nuevo servicio / proceso / herramienta / cambio operativo].

El equipo al que se lo presento es [AUDIENCIA INTERNA]. El principal obstáculo o resistencia que anticipo es [DESCRIBIR].

Estructurá una propuesta interna de máximo una página que incluya: problema o oportunidad que justifica la iniciativa, solución propuesta en términos concretos, impacto esperado (en tiempo / costo / calidad / capacidad), recursos necesarios y cronograma estimado, y cómo se mide el éxito. Tono: ejecutivo, directo. Sin buzzwords.`,
      },
      {
        title: 'Resumen ejecutivo para cliente',
        desc: 'Convertí un informe técnico o extenso en un resumen ejecutivo de una página.',
        tool: 'Claude',
        tags: ['Cliente', 'Reportes'],
        prompt: `Actuá como director de cuentas senior. Tengo el siguiente informe / resultado / situación para comunicarle a un cliente:

[PEGAR EL CONTENIDO O DESCRIBIR LA SITUACIÓN]

El cliente es [CLIENTE]. Su nivel de conocimiento técnico es [ALTO / MEDIO / BAJO]. La relación actual con el cliente es [BUENA / TENSA / NUEVA].

Convertilo en un resumen ejecutivo de máximo 300 palabras con: situación actual en una oración, 3 puntos clave que el cliente debe saber, próximos pasos concretos con responsables y fechas, y si hay malas noticias: cómo comunicarlas sin perder la confianza del cliente. Tono: profesional, claro, sin excusas.`,
      },
    ],
  },
  {
    role: 'Administrativo',
    prompts: [
      {
        title: 'Redacción de email profesional',
        desc: 'Escribí un email claro, profesional y con el tono adecuado para cualquier situación.',
        tool: 'Claude',
        tags: ['Comunicación', 'Email'],
        prompt: `Actuá como asistente ejecutivo. Necesito redactar un email [TIPO: formal / informal / urgente / de seguimiento / de disculpa] dirigido a [DESTINATARIO: cliente / proveedor / equipo / directivo].

El contexto es: [DESCRIBIR LA SITUACIÓN]. El objetivo del email es: [LO QUE QUIERO LOGRAR]. Información clave a incluir: [DATOS, FECHAS, NÚMEROS RELEVANTES]. Tono requerido: [TONO].

Redactá el email completo con asunto, cuerpo y despedida. Máximo 200 palabras. Sin frases vacías como "espero que este email te encuentre bien". Directo, claro y con un único CTA si corresponde.`,
      },
      {
        title: 'Minuta de reunión',
        desc: 'Convertí notas o audio de reunión en una minuta estructurada con acuerdos y responsables.',
        tool: 'Claude',
        tags: ['Reuniones', 'Documentación'],
        prompt: `Actuá como asistente de proyectos. Tengo las siguientes notas o transcripción de una reunión:

[PEGAR NOTAS O TRANSCRIPCIÓN]

Convertilo en una minuta estructurada que incluya: fecha y participantes, objetivo de la reunión (una oración), decisiones tomadas (listado puntual), tareas y responsables con fecha límite (tabla: Tarea | Responsable | Fecha), temas pendientes para la próxima reunión.

Formato claro, escaneable. Si hay ambigüedades en quién es responsable de algo, marcalo como [CONFIRMAR].`,
      },
      {
        title: 'Organización de agenda y prioridades',
        desc: 'Reorganizá una lista de tareas según urgencia e impacto con criterio claro.',
        tool: 'ChatGPT',
        tags: ['Productividad', 'Organización'],
        prompt: `Actuá como asistente de productividad. Tengo la siguiente lista de tareas para [HOY / ESTA SEMANA]:

[LISTAR TODAS LAS TAREAS]

Organizalas aplicando la matriz de Eisenhower (urgente/importante) y dame: lista priorizada con justificación de una línea por cada tarea, las 3 tareas que debo resolver sí o sí hoy, las que puedo delegar (si aplica) y las que puedo mover sin impacto real. Si hay alguna tarea que parece urgente pero no es importante, identificala explícitamente.`,
      },
    ],
  },
  {
    role: 'Desarrolladores',
    prompts: [
      {
        title: 'Revisión y mejora de código',
        desc: 'Auditá un fragmento de código e identificá bugs, ineficiencias y mejoras.',
        tool: 'Claude',
        tags: ['Code Review', 'Debug'],
        prompt: `Actuá como senior software engineer especializado en [LENGUAJE/FRAMEWORK]. Revisá el siguiente código:

[PEGAR EL CÓDIGO]

Contexto: este código es parte de [DESCRIBIR QUÉ HACE EL SISTEMA]. El problema actual o lo que quiero mejorar es: [DESCRIBIR].

Identificá: bugs existentes o potenciales, ineficiencias de performance, problemas de seguridad si los hay, malas prácticas del lenguaje o framework, y oportunidades de refactor. Para cada punto indicá: qué está mal, por qué es un problema y cómo corregirlo con código de ejemplo. Sé directo. Si el código está bien, decilo.`,
      },
      {
        title: 'Documentación técnica',
        desc: 'Generá documentación clara para un componente, función o sistema.',
        tool: 'Claude',
        tags: ['Documentación', 'Técnica'],
        prompt: `Actuá como technical writer con experiencia en desarrollo de software. Necesito documentar [COMPONENTE / FUNCIÓN / API / SISTEMA] para [AUDIENCIA: equipo interno / desarrolladores externos / usuarios finales].

El código o descripción del sistema es: [PEGAR CÓDIGO O DESCRIPCIÓN].

Generá documentación que incluya: descripción de qué hace y para qué sirve, parámetros o inputs (nombre, tipo, descripción, si es requerido), outputs o retorno esperado, ejemplos de uso con código (mínimo 2 casos), casos de error conocidos y cómo manejarlos, y dependencias o requisitos previos. Formato: Markdown.`,
      },
      {
        title: 'Arquitectura de solución con IA',
        desc: 'Diseñá la arquitectura técnica de una solución o MVP que incorpore IA.',
        tool: 'Claude',
        tags: ['Arquitectura', 'IA', 'MVP'],
        prompt: `Actuá como solutions architect especializado en integración de IA. Necesito diseñar la arquitectura técnica para el siguiente MVP:

Problema a resolver: [DESCRIBIR EL PROBLEMA]. Usuarios del sistema: [QUIÉN LO USA Y CON QUÉ FRECUENCIA]. Inputs disponibles: [DATOS, DOCUMENTOS, APIs]. Output esperado: [QUÉ ENTREGA EL SISTEMA]. Stack preferido o disponible: [TECNOLOGÍAS].

Diseñá la arquitectura con: diagrama de flujo en texto (componentes y conexiones), modelo de IA recomendado y justificación (Claude / GPT-4 / Gemini / fine-tuning propio), cómo se integra la IA en el flujo, puntos de falla a anticipar y cómo mitigarlos, y estimación de complejidad de desarrollo (días/semanas). Sé realista. Si el scope es demasiado grande para un MVP, indicá qué recortar.`,
      },
      {
        title: 'Prompt para automatización con n8n o Make',
        desc: 'Diseñá el flujo de automatización y los nodos necesarios para resolver una tarea repetitiva.',
        tool: 'ChatGPT',
        tags: ['Automatización', 'n8n', 'Make'],
        prompt: `Actuá como especialista en automatización de procesos. Necesito automatizar el siguiente flujo de trabajo:

Descripción del proceso actual: [DESCRIBIR PASO A PASO QUÉ SE HACE HOY MANUALMENTE]. Trigger o disparador: [QUÉ INICIA EL FLUJO]. Herramientas involucradas: [LISTAR: Gmail, Notion, HubSpot, Slack, etc.]. Resultado esperado: [QUÉ DEBE PASAR AL FINAL]. Herramienta de automatización: [N8N / MAKE / ZAPIER].

Diseñá el flujo de automatización con: nodos necesarios en orden, configuración clave de cada nodo, dónde interviene IA (si corresponde) y con qué prompt, puntos donde podría fallar y cómo manejarlo, y estimación de tiempo de implementación.`,
      },
    ],
  },
];
