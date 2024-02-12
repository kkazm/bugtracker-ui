import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthenticationService).getAuthToken();

  if (!authToken) {
    console.warn('No authentication token found. Skipping authentication interceptor.')
    return next(req);
  }

  if (!req.url.includes('localhost')) { // TODO Set proper url
    console.warn(req.url)
    return next(req);
  }

  console.log('Setting authorization header');
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });
  return next(newReq);
};
