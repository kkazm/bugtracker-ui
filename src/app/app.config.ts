import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { myCustomInterceptor } from './my-custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([myCustomInterceptor])
    ),
    importProvidersFrom(
      HttpClientModule, // TODO Is this necessary?
      // MatSnackBarModule 
    ),
/*     {
      provide: ErrorHandler, // TODO Delete this
      useClass: MyErrorHandlerService
    } */
  ]
};
