import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const myCustomInterceptor: HttpInterceptorFn = (req, next) => {
  console.warn('no elo', req.url);
  const userToken = 'MY_TOKEN';
  // const modifiedReq = req.clone({
  //   headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  // });

  return next(req)
    .pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Coś zwrócił!');
          console.log(req.url, 'returned a response with status', event.status);
        }
      })
    );
};
