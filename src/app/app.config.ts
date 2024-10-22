import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DOCUMENT } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authTokenInterceptor } from './interceptors/auth-token/auth-token.interceptor';
import { requestErrorInterceptors } from './interceptors/request-error-interceptors';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authTokenInterceptor, ...requestErrorInterceptors]),
    ),
    { provide: Document, useExisting: DOCUMENT },
    MessageService,
    DialogService,
    ConfirmationService,
  ],
};
