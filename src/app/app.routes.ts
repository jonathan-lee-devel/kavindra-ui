import { Routes } from '@angular/router';

import { SchedulePageComponent } from './components/pages/_authenticated/schedule-page/schedule-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  LOGIN = 'login',
  REGISTER = 'register',
  /* ERROR ROUTES */
  ERROR_NOT_FOUND = 'error/not-found',
  /* AUTHENTICATED ROUTES */
  HOME = ':clientId/home',
  SCHEDULE = ':clientId/schedule',
}

export const routes: Routes = [
  /* ANONYMOUS ROUTES */
  {
    path: RoutePath.LANDING_PAGE,
    component: LandingPageComponent,
  },
  {
    path: RoutePath.LOGIN,
    component: LoginPageComponent,
  },
  {
    path: RoutePath.REGISTER,
    component: RegisterPageComponent,
  },
  /* AUTHENTICATED ROUTES */
  {
    path: RoutePath.HOME,
    component: HomePageComponent,
  },
  {
    path: RoutePath.SCHEDULE,
    component: SchedulePageComponent,
  },
];

export const rebaseRoutePath = (routePath: RoutePath) => `/${routePath}`;
export const rebaseRoutePathAsString = (routePathAsString: string) =>
  `/${routePathAsString}`;

export const routePathParameters = {
  PROPERTY_ID: ':propertyId',
  TOKEN_VALUE: ':tokenValue',
} as const;
