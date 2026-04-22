
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

const AUTH_FREE = ['/api/auth/token/', '/api/auth/token/refresh/',
                   '/api/auth/register/'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const isAuthFree = AUTH_FREE.some(p => req.url.includes(p));

  const token = auth.accessToken;
  const reqWithToken = (token && !isAuthFree)
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(reqWithToken).pipe(
    catchError((err: HttpErrorResponse) => {

      if (err.status === 401 && !isAuthFree && auth.refreshToken) {
        return auth.refresh().pipe(
          switchMap(newAccess => {
            const replay = req.clone({
              headers: req.headers.set('Authorization',
                                       `Bearer ${newAccess}`),
            });
            return next(replay);
          }),
          catchError(refreshErr => {
            auth.logout();
            return throwError(() => refreshErr);
          }),
        );
      }
      return throwError(() => err);
    }),
  );
};
