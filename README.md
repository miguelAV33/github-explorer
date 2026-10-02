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

El resultado se genera en `dist/github-explorer/browser`. Si se despliega en una subcarpeta (por ejemplo `/demo-github-explorer/` dentro de otro sitio), hay que compilar indicando esa ruta:

```bash
npx ng build --base-href /demo-github-explorer/
```

> **Nota:** al ser una aplicación Angular compilada en módulos ES, el build de producción necesita servirse desde un servidor web (http/https) — no funciona abriendo `index.html` directamente con doble clic (`file://`), por una restricción de seguridad de los navegadores con los módulos de JavaScript.

## Decisiones de diseño

- **Sin backend propio:** toda la app es estática y consulta la API pública de GitHub directamente desde el navegador, por lo que se puede desplegar en cualquier hosting estático (Netlify, Vercel, GitHub Pages).
- **Favoritos sin servidor:** se guardan en `localStorage` envuelto en try/catch, para que la app no se rompa en navegación privada o si el almacenamiento no está disponible.

## Autor

Miguel Ángel Alonso Valhondo — [LinkedIn](https://www.linkedin.com/in/miguelangel-alonso-valhondo) · [Portfolio](https://tu-dominio.netlify.app)
