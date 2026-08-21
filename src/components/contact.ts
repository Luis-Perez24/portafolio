import type { Site } from '../content/site';
import type { IconName } from './icons';

/**
 * Los medios de contacto que la página sabe representar. El tipo existe para
 * que agregar un medio nuevo sin su ícono sea un error de compilación y no un
 * hueco silencioso en la interfaz.
 */
export type ContactMedium = Extract<IconName, 'email' | 'github' | 'linkedin' | 'cv'>;

export interface ContactLink {
  medium: ContactMedium;
  label: string;
  href: string;
  rel?: string;
  download: boolean;
}

/**
 * LinkedIn y el CV solo aparecen cuando existen (ADR-004): mientras sigan en
 * `null` en `site.ts`, ni el enlace ni su ícono se renderizan.
 */
export function contactLinks(site: Site): ContactLink[] {
  return [
    {
      medium: 'email',
      label: site.email,
      href: `mailto:${site.email}`,
      download: false,
    },
    {
      medium: 'github',
      label: 'GitHub',
      href: site.github,
      rel: 'me noopener',
      download: false,
    },
    ...(site.linkedin
      ? [
          {
            medium: 'linkedin' as const,
            label: 'LinkedIn',
            href: site.linkedin,
            rel: 'me noopener',
            download: false,
          },
        ]
      : []),
    ...(site.cvPath
      ? [
          {
            medium: 'cv' as const,
            label: 'Descargar CV',
            href: site.cvPath,
            download: true,
          },
        ]
      : []),
  ];
}
