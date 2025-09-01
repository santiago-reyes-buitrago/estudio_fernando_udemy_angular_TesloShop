import {Routes} from '@angular/router';
import {AuthLayout} from '@auth/layout/auth-layout/auth-layout';
import {Login} from '@auth/pages/login/login';
import {Register} from '@auth/pages/register/register';


const routes:Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {path: 'login',component: Login},
      {path: 'register',component: Register},
      {path: '**', redirectTo: 'login'}
    ]
  }
]

export default routes
