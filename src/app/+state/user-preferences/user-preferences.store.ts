import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthService } from '../../services/auth/auth.service';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { NotificationsStore } from '../notifications/notifications.store';

export type UserPreferencesState = {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
};

const initialState: UserPreferencesState = {
  isDarkMode: false,
  isSidebarOpen: true,
};

export const UserPreferencesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notificationsStore = inject(NotificationsStore);
    const document = inject(Document);
    const supabaseService = inject(SupabaseService);
    return {
      setIsSidebarOpen: (isSidebarOpen: boolean) => {
        patchState(store, { isSidebarOpen });
      },
      setDarkModeEnabled: () => {
        const linkElement = document.getElementById(
          'app-theme',
        ) as unknown as HTMLLinkElement;
        linkElement.href = 'theme-dark.css';
        authService.setDarkModeSettingInLocalStorage(true);
        patchState(store, { isDarkMode: true });
      },
      setLightModeEnabled: () => {
        const linkElement = document.getElementById(
          'app-theme',
        ) as unknown as HTMLLinkElement;
        linkElement.href = 'theme-light.css';
        authService.setDarkModeSettingInLocalStorage(false);
        patchState(store, { isDarkMode: false });
      },
    };
  }),
  withHooks({
    onInit: (store) => {
      if (
        !localStorage.getItem(AuthService.darkModeKey) &&
        window?.matchMedia('(prefers-color-scheme: dark)')?.matches
      ) {
        store.setDarkModeEnabled();
      } else if (
        JSON.parse(localStorage.getItem(AuthService.darkModeKey) ?? 'false')
      ) {
        store.setDarkModeEnabled();
      } else {
        store.setLightModeEnabled();
      }
    },
  }),
);
