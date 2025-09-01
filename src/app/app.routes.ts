import { Routes } from '@angular/router';
import {Login} from '@auth/pages/login/login';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.routes'),
    //TODO guards
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
