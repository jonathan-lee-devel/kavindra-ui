import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { rebaseRoutePath, RoutePath } from '../../app.routes';
import { UserProfile } from '../../dtos/auth/UserProfile';
import { RouterUtils } from '../../util/router/Router.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly darkModeKey = 'dark-mode';
  static readonly nextParam = 'next';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  checkIn(userInfo: UserProfile) {
    return this.httpClient.post<{ isAcknowledged: boolean }>(
      `${environment.USERS_SERVICE_BASE_URL}/authenticated/check-in`,
      userInfo,
    );
  }

  public redirectIfNotAnonymous() {
    if (this.router.url !== '/') {
      // Don't redirect to login page on anonymous pages (first-time visit etc.)
      this.router
        .navigate([rebaseRoutePath(RoutePath.LOGIN)])
        .catch(RouterUtils.navigateCatchErrorCallback);
    }
  }

  public getNextParamFromLocalStorageAndNoReset() {
    return null;
  }

  public setNextParamInLocalStorageIfNotAnonymous(next: string | null) {
    console.log(next);
    localStorage.removeItem(AuthService.nextParam);
    return;
    // if (
    //   next?.startsWith('/#') ||
    //   next === rebaseRoutePath(RoutePath.LANDING_PAGE) ||
    //   next === rebaseRoutePath(RoutePath.HOME)
    // ) {
    //   return;
    // }
    // if (next && next !== '/' && next !== rebaseRoutePath(RoutePath.LOGIN)) {
    //   localStorage.setItem(AuthService.nextParam, next);
    // } else {
    //   localStorage.setItem(
    //     AuthService.nextParam,
    //     rebaseRoutePath(RoutePath.HOME),
    //   );
    // }
  }

  getDarkModeSettingFromLocalStorage() {
    return localStorage.getItem(AuthService.darkModeKey) === 'true';
  }

  setDarkModeSettingInLocalStorage(isDarkMode: boolean) {
    localStorage.setItem(AuthService.darkModeKey, JSON.stringify(isDarkMode));
  }
}
