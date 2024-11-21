import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { authenticationInterceptor } from './authentication.interceptor';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { enUS, zhCN } from 'date-fns/locale';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePl);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideDateFnsAdapter(),
    // { provide: LOCALE_ID, useValue: 'pl-PL' }, 
    { provide: MAT_DATE_LOCALE, useValue: enUS },
    // { provide: MAT_DATE_FORMATS, useValue: }, 
    provideHttpClient(
      withInterceptors([
        authenticationInterceptor
      ])
    ),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    importProvidersFrom(
      // HttpClientModule
    ),
    /*
    {
      provide: ErrorHandler,
      useClass: MyErrorHandlerService
    }
    */
  ]
};
