/**
 * Todo el contenido visible del sitio vive aquí. Ningún componente contiene
 * strings de contenido: actualizar el portafolio es editar este archivo.
 *
 * Los campos en `null` representan material que todavía no existe. La página
 * simplemente no renderiza el elemento correspondiente, en lugar de mostrar
 * un placeholder. Pendientes hoy:
 *   - `cvPath`            → CV en PDF
 *   - `linkedin`          → URL del perfil
 *   - `videoUrl` (×2)     → screencasts de demostración
 *   - `demoUrl`  (×2)     → se llenan cuando los proyectos estén desplegados
 *   - `public/media/`     → screenshots de los proyectos
 */

export interface Metric {
  /** Lo que se destaca en grande: "0", "<100ms". */
  value: string;
  label: string;
  detail?: string;
}

export interface RepoLink {
  /** Texto del enlace. Distingue los repos de un proyecto de dos partes. */
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  /** Qué problema real resuelve, en una línea. */
  tagline: string;
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

export interface Site {
  name: string;
  title: string;
  heroPitch: string;
  about: string[];
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
  about: [
    'Estudiante de 5to año de Ingeniería Civil Informática en Temuco, Chile.',
    'Me enfoco en backend robusto: concurrencia, integridad de datos y APIs que se miden bajo carga en lugar de suponerse rápidas.',
    'Documento cada decisión de arquitectura en un ADR, con las alternativas que descarté y por qué.',
    'Disponible para trabajo remoto.',
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
  linkedin: null,
  repoUrl: 'https://github.com/Luis-Perez24/portafolio',
};

export const projects: Project[] = [
  {
    id: 'reservafacil',
    name: 'ReservaFácil',
    tagline:
      'SaaS multi-tenant de reservas con pago online para pymes chilenas.',
    metric: {
      value: '0',
      label: 'dobles reservas en 100 requests concurrentes al mismo horario',
      detail: '1 creada · 99 × HTTP 409',
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
    demoUrl: null,
    status: 'live',
  },
  {
    id: 'patipets',
    name: 'PatiPets',
    tagline: 'Plataforma full-stack de adopción de mascotas.',
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
    demoUrl: null,
    status: 'live',
  },
  {
    id: 'combustibles-cne',
    name: 'Combustibles CNE',
    tagline:
      'Pipeline de datos públicos de la CNE: millones de registros de precios de combustibles, consultas geoespaciales con PostGIS y rendimiento medido con EXPLAIN ANALYZE.',
    decisions: [],
    stack: ['PostgreSQL', 'PostGIS'],
    repos: [],
    videoUrl: null,
    demoUrl: null,
    status: 'wip',
  },
];
