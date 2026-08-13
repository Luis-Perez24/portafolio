// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// `site` se define cuando exista el dominio: sin él, canonical y og:url
// apuntarían a una URL inventada.
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});
