/**
 * Todo el contenido visible del sitio vive aquí. Ningún componente contiene
 * strings de contenido: actualizar el portafolio es editar este archivo.
 *
 * Los campos en `null` representan material que todavía no existe. La página
 * simplemente no renderiza el elemento correspondiente, en lugar de mostrar
 * un placeholder. Pendientes hoy:
 *   - `cvPath`                        → CV en PDF
 *   - `preview` (×3)                  → clip de 6–8 s y póster de cada proyecto
 *   - `videoUrl`/`demoUrl` (ReservaFácil, PatiPets) → vuelven a rellenarse
 *     con URLs reales recién cuando esos proyectos estén desplegados (Fase 4)
 */

export interface MetricDistribution {
  color: 'ok' | 'flag';
  count: number;
}

export interface Metric {
  /** Lo que se destaca en grande: "0", "<100ms". */
  value: string;
  label: string;
  detail?: string;
  /** Desglose real para el elemento firma (puntos de status), no un porcentaje. */
  distribution?: MetricDistribution[];
}

export interface RepoLink {
  /** Texto del enlace. Distingue los repos de un proyecto de dos partes. */
  label: string;
  url: string;
}

/** Clip corto en loop que encabeza la card del proyecto. */
export interface Preview {
  /** Video de 6–8 s, sin audio. Conviene `.mp4` (H.264) y `.webm` (VP9). */
  clip: string;
  /** Primer fotograma: se pinta mientras el video carga y si no puede correr. */
  poster: string;
  /** Qué se ve en el clip, para quien no puede verlo. */
  alt: string;
}

export interface Project {
  id: string;
  name: string;
  /** Qué problema real resuelve, en una línea. */
  tagline: string;
  /** `null` → la card muestra el hueco de la vista previa, todavía sin material. */
  preview: Preview | null;
  /** La evidencia protagonista de la card. */
  metric?: Metric;
  /** Decisiones técnicas, no listas de features. */
  decisions: string[];
  stack: string[];
  repos: RepoLink[];
  videoUrl: string | null;
  /** `null` → el botón "Ver demo" no se renderiza. */
  demoUrl: string | null;
  /** "wip" → se renderiza como teaser, sin botones. */
  status: 'live' | 'wip';
}

/**
 * Un dato duro de la ficha de «sobre mí».
 *
 * Existen como estructura y no como frases dentro de `about` a propósito: son
 * campos, no prosa. Escritos en párrafo se leían como un volcado de datos y
 * nadie los escaneaba; como ficha se leen de un vistazo y el texto de al lado
 * queda libre para tener voz. El ícono es del mismo catálogo que ya usan
 * skills y contacto — nada nuevo, solo un dato más fácil de escanear.
 */
export interface ProfileFact {
  icon: 'location' | 'remote' | 'education' | 'focus';
  label: string;
  value: string;
  /** Segunda línea, para cuando el dato no entra en una. */
  detail?: string;
}

export interface Site {
  name: string;
  title: string;
  heroPitch: string;
  about: string[];
  /** Los datos duros del «sobre mí», al lado del texto. */
  profile: ProfileFact[];
  skillsPrimary: string[];
  skillsSecondary: string[];
  /** `null` → el botón "Descargar CV" no se renderiza. */
  cvPath: string | null;
  email: string;
  github: string;
  /** `null` → el enlace a LinkedIn no se renderiza. */
  linkedin: string | null;
  repoUrl: string;
}

export const site: Site = {
  name: 'Luis Pérez',
  title: 'Desarrollador Full-Stack · Java/Spring · NestJS · Angular',
  heroPitch:
    'Construyo sistemas que aguantan concurrencia real: reservas sin dobles cobros, pagos idempotentes con Webpay, APIs medidas con pruebas de carga.',
  // La formación, la ubicación y la modalidad ya NO van acá: son datos, y
  // viven en `profile`. Lo que queda en prosa es lo que solo se puede decir
  // con voz propia.
  about: [
    'Me enfoco en backend robusto: concurrencia, integridad de datos y APIs que se miden bajo carga en lugar de suponerse rápidas.',
    'Documento cada decisión de arquitectura en un ADR, con las alternativas que descarté y por qué.',
  ],
  profile: [
    { icon: 'location', label: 'Ubicación', value: 'Temuco, Chile' },
    { icon: 'remote', label: 'Modalidad', value: 'Remoto' },
    {
      icon: 'education',
      label: 'Formación',
      value: 'Ing. Informática · 5to año',
      detail: 'Universidad de La Frontera',
    },
    { icon: 'focus', label: 'Enfoque', value: 'Backend · full-stack' },
  ],
  skillsPrimary: [
    'Java 21',
    'Spring Boot 3',
    'TypeScript',
    'NestJS',
    'Angular',
    'Vue 3',
    'PostgreSQL',
    'Docker',
    'Git',
  ],
  skillsSecondary: ['Python', 'Gemini API', 'Redis', 'Linux', 'VPS/Coolify'],
  cvPath: null,
  email: 'luisperez.llancaqueo@gmail.com',
  github: 'https://github.com/Luis-Perez24',
  linkedin: 'https://www.linkedin.com/in/luis-perez-895927233/',
  repoUrl: 'https://github.com/Luis-Perez24/portafolio',
};

export const projects: Project[] = [
  {
    id: 'reservafacil',
    name: 'ReservaFácil',
    tagline:
      'SaaS multi-tenant de reservas con pago online para pymes chilenas.',
    preview: null,
    metric: {
      value: '0',
      label: 'dobles reservas en 100 requests concurrentes al mismo horario',
      detail: '1 creada · 99 × HTTP 409',
      distribution: [
        { color: 'ok', count: 1 },
        { color: 'flag', count: 99 },
      ],
    },
    decisions: [
      'Monolito modular por decisión, no por defecto: los microservicios no resolvían ningún problema que yo tuviera.',
      'Anti-doble-reserva con lock pesimista (SELECT … FOR UPDATE) y restricción única en PostgreSQL, verificado con una prueba de carga.',
      'Pagos Webpay Plus idempotentes, con buy_order como clave de la operación.',
      'Multi-tenancy con tenant_id desde el primer día, no como parche posterior.',
    ],
    stack: [
      'NestJS',
      'PostgreSQL 16',
      'Redis/BullMQ',
      'Angular 18',
      'Webpay',
      'Gemini',
      'Docker',
    ],
    repos: [
      { label: 'Ver código', url: 'https://github.com/Luis-Perez24/ReservaFacil' },
    ],
    videoUrl: null,
    demoUrl: 'https://reservafacil.lperez.dev/barberia-nogal',
    status: 'live',
  },
  {
    id: 'patipets',
    name: 'PatiPets',
    tagline: 'Plataforma full-stack de adopción de mascotas.',
    preview: null,
    decisions: [
      'Arquitectura hexagonal en el backend y en el frontend: el dominio no sabe de frameworks.',
      'Autenticación JWT propia, con registro, refresh y roles, en vez de delegar en un servicio externo.',
      'Esquema de base de datos versionado con migraciones Flyway.',
      'Arquitectura documentada en modelo C4 y todo el sistema levantando con un docker compose up.',
    ],
    stack: ['Java 21', 'Spring Boot 3', 'Vue 3', 'Pinia', 'PostgreSQL', 'Docker'],
    repos: [
      {
        label: 'Ver código (backend)',
        url: 'https://github.com/Luis-Perez24/patipets-backend',
      },
      {
        label: 'Ver código (frontend)',
        url: 'https://github.com/Luis-Perez24/patipets-frontend',
      },
    ],
    videoUrl: null,
    demoUrl: 'https://patipets.lperez.dev',
    status: 'live',
  },
  {
    id: 'combustibles-cne',
    name: 'Combustibles CNE',
    tagline:
      'Pipeline de datos públicos de la CNE: millones de registros de precios de combustibles, consultas geoespaciales con PostGIS y rendimiento medido con EXPLAIN ANALYZE.',
    preview: null,
    decisions: [],
    stack: ['PostgreSQL', 'PostGIS'],
    repos: [],
    videoUrl: null,
    demoUrl: null,
    status: 'wip',
  },
];
