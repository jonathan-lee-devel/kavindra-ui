import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { take } from 'rxjs';
import { rebaseRoutePath, RoutePath } from '../../app.routes';
import { AuthService } from '../../services/auth/auth.service';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { RouterUtils } from '../../util/router/Router.utils';
import { NotificationsStore } from '../notifications/notifications.store';
import { MessageService } from 'primeng/api';

export type LoggedInState = 'INIT' | 'NOT_LOGGED_IN' | 'LOADING' | 'LOGGED_IN';

export type UserAuthenticationState = {
  loggedInState: LoggedInState;
};

const initialState: UserAuthenticationState = {
  loggedInState: 'INIT',
};

export const UserAuthenticationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notificationsStore = inject(NotificationsStore);
    const supabaseService = inject(SupabaseService);
    const messageService = inject(MessageService);
    return {
      onLoginComplete: async () => {
        const next = authService.getNextParamFromLocalStorageAndNoReset();
        if (next) {
          router
            .navigateByUrl(next)
            .catch(RouterUtils.navigateCatchErrorCallback);
        }
        patchState(store, { loggedInState: 'LOGGED_IN' });
        messageService.add({
          severity: 'info',
          life: 3_000,
          summary: 'Login Success',
          detail: `Welcome back: ${supabaseService.session?.user?.email}`,
        });
      },
      userCheckIn: () => {
        if (store.loggedInState() === 'LOGGED_IN') {
          authService
            .checkIn({
              email: supabaseService.session?.user?.email ?? '',
              displayName: supabaseService.session?.user?.user_metadata['name'],
            })
            .pipe(take(1))
            .subscribe();
        }
      },
      logout: async () => {
        patchState(store, { loggedInState: 'LOADING' });
        await supabaseService.signOut();
        authService.setNextParamInLocalStorageIfNotAnonymous(null);
        authService.redirectIfNotAnonymous();
        patchState(store, { ...initialState });
        router
          .navigate([rebaseRoutePath(RoutePath.LOGIN)])
          .catch(RouterUtils.navigateCatchErrorCallback);
        notificationsStore.unloadNotifications();
      },
    };
  }),
  withMethods((store) => {
    return {
      onLoginError: (error: Error) => {
        store.logout().catch((reason) => console.error(reason));
      },
    };
  }),
  withMethods((store) => {
    const authService = inject(AuthService);
    const supabaseService = inject(SupabaseService);
    return {
      attemptSupabaseSignUpWithEmail: async (
        email: string,
        password: string,
      ) => {
        patchState(store, { loggedInState: 'LOADING' });
        const { error } = await supabaseService.signUpWithEmail(
          email,
          password,
        );
        if (error) {
          store.onLoginError(error);
        } else {
          patchState(store, { loggedInState: 'NOT_LOGGED_IN' });
        }
      },
      attemptSupabaseLoginWithEmail: async (
        email: string,
        password: string,
      ) => {
        patchState(store, { loggedInState: 'LOADING' });
        const { error } = await supabaseService.signInWithEmail(
          email,
          password,
        );
        if (error) {
          store.onLoginError(error);
        }
      },
      attemptSupabaseLoginWithGoogle: async () => {
        patchState(store, { loggedInState: 'LOADING' });
        const { error } = await supabaseService.signInWithGoogle();
        if (error) {
          store.onLoginError(error);
        } else {
          store.onLoginComplete();
        }
      },
      attemptSupabaseLoginWithGitHub: async () => {
        patchState(store, { loggedInState: 'LOADING' });
        const { error } = await supabaseService.signInWithGitHub();
        if (error) {
          store.onLoginError(error);
        }
      },
      checkLoginOnRefresh: () => {
        if (
          supabaseService.session?.access_token &&
          supabaseService.session?.access_token !== ''
        ) {
          store.onLoginComplete().catch((reason) => console.error(reason));
        }
      },
      onLoginPageVisitedWithNext: (next: string) => {
        authService.setNextParamInLocalStorageIfNotAnonymous(next);
      },
    };
  }),
  withComputed((store) => {
    const supabaseService = inject(SupabaseService);
    return {
      currentUserEmail: computed(() => supabaseService?.session?.user.email),
      currentUserId: computed(() => supabaseService?.session?.user.id),
      isLoggedIn: computed(() => store.loggedInState() === 'LOGGED_IN'),
    };
  }),
);
