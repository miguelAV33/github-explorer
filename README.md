# GitHub Explorer

Buscador de perfiles de GitHub construido con Angular: consulta la API pública de GitHub, muestra el perfil y los repositorios de cualquier usuario, y guarda favoritos en el navegador.

**Demo en vivo:** https://tu-dominio.netlify.app/demo-github-explorer/
**Más contexto del proyecto:** https://tu-dominio.netlify.app/proyectos/github-explorer

![GitHub Explorer](./docs/screenshot.png)

## Características

- Búsqueda de cualquier usuario público de GitHub, con validación del formato del nombre antes de llamar a la API.
- Ficha de perfil: avatar, bio, ubicación, empresa y estadísticas (repositorios, seguidores, seguidos).
- Listado de repositorios públicos ordenable por actualizados recientemente, estrellas o nombre, con los forks filtrados fuera.
- Favoritos persistentes en `localStorage`, accesibles desde su propia sección aunque se recargue la página.
- Mensajes de error en español cuando el usuario no existe o se agota el límite de peticiones de la API.

## Stack técnico

- **Angular 18** — componentes standalone, sin NgModules
- **Signals** para el estado reactivo (`signal`, `computed`)
- **Reactive Forms** con validación por patrón
- **HttpClient** (`provideHttpClient(withFetch())`) con manejo de errores centralizado en un servicio
- **Bootstrap 5** como base de componentes
- **GitHub REST API** (sin autenticación, solo endpoints públicos)

## Desarrollo local

```bash
npm install
npm start          # servidor de desarrollo en http://localhost:4200
```

## Build de producción

```bash
npm run build
```

El resultado se genera en `dist/github-explorer/browser` y es totalmente estático: funciona subido a cualquier hosting (también dentro de una subcarpeta, como `/demo-github-explorer/`) **y abriendo `index.html` con doble clic**, sin servidor.

Para conseguirlo, `npm run build` hace dos pasos:

1. `ng build` normal, sin etiqueta `<base>` y con rutas por hash (`#/usuario/torvalds`), así que no hace falta configurar reglas de reescritura en el servidor y los enlaces directos sobreviven a una recarga.
2. [`scripts/build-estatico.mjs`](scripts/build-estatico.mjs) vuelve a empaquetar cada script con esbuild en formato IIFE y lo carga como `<script defer>` en lugar de `<script type="module">`. Los navegadores bloquean los módulos ES cargados desde `file://`; los scripts clásicos no.

## Tests

```bash
npm test           # Karma + Jasmine en Chrome, con recarga al guardar
npm run test:ci    # una sola pasada en Chrome sin ventana (CI, contenedores)
```

16 tests unitarios: el servicio de favoritos (alta y baja sin distinguir mayúsculas, persistencia en `localStorage`, datos corruptos y `localStorage` que falla en navegación privada), el servicio de la API con `HttpTestingController` (URLs y traducción de los errores 404, 403 y 500 a mensajes en español), el formato de cifras y el componente raíz.

## Decisiones de diseño

- **Rutas con hash** (`withHashLocation()`): la app funciona igual en la raíz de un dominio, en una subcarpeta o desde el disco, sin depender de la configuración del servidor.
- **Sin backend propio:** toda la app es estática y consulta la API pública de GitHub directamente desde el navegador, por lo que se puede desplegar en cualquier hosting estático (Netlify, Vercel, GitHub Pages).
- **Favoritos sin servidor:** se guardan en `localStorage` envuelto en try/catch, para que la app no se rompa en navegación privada o si el almacenamiento no está disponible.

## Autor

Miguel Ángel Alonso Valhondo — [LinkedIn](https://www.linkedin.com/in/miguelangel-alonso-valhondo) · [Portfolio](https://tu-dominio.netlify.app)
