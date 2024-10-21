import { Routes } from '@angular/router';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {LoginPageComponent} from './components/pages/login-page/login-page.component';
import {RegisterPageComponent} from './components/pages/register-page/register-page.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';

export const routes: Routes = [
  /* ANONYMOUS ROUTES */
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  /* AUTHENTICATED ROUTES */
  {
    path: 'home',
    component: HomePageComponent,
  }
];
