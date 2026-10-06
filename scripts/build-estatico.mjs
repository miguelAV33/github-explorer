// Convierte el build de Angular en uno que funciona también abriendo
// index.html con doble clic (protocolo file://).
//
// Por qué hace falta: Angular genera los scripts como módulos ES
// (<script type="module">) y los navegadores bloquean los módulos cargados
// desde file:// por seguridad. Aquí se vuelve a empaquetar cada script con
// esbuild en formato IIFE (sus variables quedan encerradas en una función y
// cualquier import a otros ficheros se integra en el propio script) y se
// carga como script clásico con "defer", que respeta el orden de ejecución.
//
// Uso: npm run build  (ejecuta "ng build" y después este script)

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildSync } from 'esbuild';

const DIST = 'dist/github-explorer/browser';
const indexPath = join(DIST, 'index.html');
let html = readFileSync(indexPath, 'utf8');

const scripts = [...html.matchAll(/<script src="([^"]+)" type="module"><\/script>/g)];
if (scripts.length === 0) {
  console.error('No hay <script type="module"> en index.html: ¿ya se había convertido o ha cambiado el formato del build?');
  process.exit(1);
}

for (const [etiqueta, fichero] of scripts) {
  const ruta = join(DIST, fichero);
  const { outputFiles } = buildSync({
    entryPoints: [ruta],
    bundle: true,
    format: 'iife',
    minify: true,
    target: 'es2020',
    write: false,
    logLevel: 'error',
  });
  writeFileSync(ruta, outputFiles[0].contents);
  html = html.replace(etiqueta, `<script src="${fichero}" defer></script>`);
  console.log(`✓ ${fichero} → script clásico (IIFE)`);
}

writeFileSync(indexPath, html);
console.log(`Build listo en ${DIST}: funciona servido desde cualquier carpeta y con doble clic.`);
