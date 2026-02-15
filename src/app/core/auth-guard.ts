import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  return auth.isAuthenticated();
};
