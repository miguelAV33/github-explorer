import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Rutas con hash (#/usuario/...): funcionan desde cualquier subcarpeta,
    // sin reglas de reescritura en el servidor y abriendo index.html con doble clic.
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch())
  ]
};
