import { Routes } from '@angular/router';

import { SchedulePageComponent } from './components/pages/_authenticated/schedule-page/schedule-page.component';
import { HomePageComponent } from './components/pages/_authenticated/home-page/home-page.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginSuccessComponent } from './components/pages/login-success/login-success.component';
import { BacklogPageComponent } from './components/pages/_authenticated/backlog-page/backlog-page.component';

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  LOGIN = 'login',
  REGISTER = 'register',
  /* ERROR ROUTES */
  ERROR_NOT_FOUND = 'error/not-found',
  /* AUTHENTICATED ROUTES */
  LOGIN_SUCCESS = 'login-success',
  HOME = ':clientId/home',
  SCHEDULE = ':clientId/schedule',
  BACKLOG = ':clientId/backlog',
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
    path: RoutePath.LOGIN_SUCCESS,
    component: LoginSuccessComponent,
  },
  {
    path: RoutePath.HOME,
    component: HomePageComponent,
  },
  {
    path: RoutePath.SCHEDULE,
    component: SchedulePageComponent,
  },
  {
    path: RoutePath.BACKLOG,
    component: BacklogPageComponent,
  },
];

export const rebaseRoutePath = (routePath: RoutePath) => `/${routePath}`;
export const rebaseRoutePathWithClientId = (
  routePath: RoutePath,
  clientId: string | undefined,
) => `/${routePath.replace(routePathParameters.CLIENT_ID, clientId ?? '')}`;
export const rebaseRoutePathAsString = (routePathAsString: string) =>
  `/${routePathAsString}`;

export const routePathParameters = {
  CLIENT_ID: ':clientId',
} as const;
