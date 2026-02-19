import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppsettingsService } from './core/api/appsettings.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/api/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAppInitializer(() => {
        const settingsService = inject(AppsettingsService);
        return settingsService.loadSettings();
    })
  ]
};