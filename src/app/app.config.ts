import { ApplicationConfig, LOCALE_ID, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { authenticationInterceptor } from './authentication.interceptor';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { enUS, zhCN } from 'date-fns/locale';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

// TODO
registerLocaleData(localePl);

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideRouter(routes),
    /**
     * If you need to have an animation happen immediately when your application
     * is loaded, you will want to switch to the eagerly loaded animations
     * module. Import provideAnimations from
     * @angular/platform-browser/animations instead, and use provideAnimations
     * in place of provideAnimationsAsync in the bootstrapApplication function
     * call.
     */
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        authenticationInterceptor
      ])
    ),
    provideDateFnsAdapter(),
    // { provide: LOCALE_ID, useValue: 'pl-PL' }, 
    { provide: MAT_DATE_LOCALE, useValue: enUS },
    // { provide: MAT_DATE_FORMATS, useValue: }, 
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    importProvidersFrom(
      HttpClientModule
    ),
    /*
    {
      provide: ErrorHandler,
      useClass: MyErrorHandlerService
    }
    */
  ]
};
