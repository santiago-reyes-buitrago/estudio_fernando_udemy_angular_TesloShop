import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@auth/services/auth.service';
import {firstValueFrom} from 'rxjs';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = ['admin'];
  await firstValueFrom(authService.checkStatus())
  console.log(authService.user()?.roles)
  if (!authService.user()?.roles.find((item) => requiredRoles.includes(item))){
    router.navigateByUrl('/');
    return false;
  }


  return true;
};
