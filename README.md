# Luis Pérez — Portafolio

Landing de una sola página: quién soy, qué construí y por qué lo construí así.
Sin plantilla, sin CMS, sin JavaScript de cliente salvo lo mínimo para el
scroll y el cambio de tema.

## Stack

- **[Astro 7](https://astro.build)** — el sitio es contenido estático (hero,
  proyectos, skills, contacto): no hay estado de usuario ni datos que cambien
  entre visitas, así que no tiene sentido pagar el costo de un framework de
  cliente. Astro entrega HTML ya renderizado y cero JS por defecto; el poco
  que hay (scroll reveal, toggle día/noche) se agrega a mano, sin runtime.
- **[Tailwind CSS 4](https://tailwindcss.com)** — tokens de diseño (color,
  tipografía, espaciado) declarados en `@theme` dentro de
  `src/styles/global.css`, sin archivo de configuración aparte.
- **TypeScript** — todo el contenido de la página vive tipado en
  `src/content/site.ts`; los componentes no contienen strings de contenido.
- **Nginx** (solo en producción) — el build es estático, así que servirlo no
  necesita Node corriendo; ver `Dockerfile`.

## Correr en local

Requiere Node ≥ 22.12.

```bash
npm install
npm run dev        # servidor local con recarga en caliente
npm run build      # build de producción en dist/
npm run preview    # sirve el build de producción en local
npm run check      # chequeo de tipos de Astro/TypeScript
```

## Docker

El `Dockerfile` es multi-stage: una etapa con Node hace el build, la imagen
final solo tiene Nginx sirviendo los archivos estáticos resultantes.

```bash
docker build -t portafolio-landing .
docker run -p 8080:80 portafolio-landing
```

## Estructura

```
src/
  content/site.ts     → todo el contenido y los datos de los proyectos
  components/          → un componente por sección/pieza de UI
  layouts/Base.astro   → <head>, meta tags, fuentes
  pages/index.astro    → arma la página a partir de site.ts
  styles/global.css    → tokens de Tailwind 4 y el sistema de motion
public/                → favicon y estáticos servidos tal cual
```

Editar el contenido de la página (textos, proyectos, links, skills) es
editar `src/content/site.ts`; ningún componente necesita tocarse para eso.

## Decisiones de diseño

El tratamiento de las métricas de los proyectos (la prueba de carga de
ReservaFácil, por ejemplo) es la única apuesta visual fuerte del sitio — el
resto es deliberadamente quieto. El detalle de esa y otras decisiones vive
documentado como ADRs en el propio historial de trabajo del proyecto.
