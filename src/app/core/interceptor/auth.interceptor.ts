import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const authorizationKey = authService.key; // Fetch the key directly
  if (authorizationKey) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authorizationKey}`,
      },
    });
    return next(clonedRequest);
  }
  return next(req);
};