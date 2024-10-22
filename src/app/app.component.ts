import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Aura } from 'primeng/themes/aura';

import { BottomFullWidthMessageComponent } from './components/lib/_messages/bottom-full-width-message/bottom-full-width-message.component';
import { NavbarComponent } from './components/lib/_navbar/navbar/navbar.component';
import { FooterComponent } from './components/lib/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from './components/lib/_sidebar/sidebar/sidebar.component';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    DialogModule,
    NavbarComponent,
    FooterComponent,
    BottomFullWidthMessageComponent,
    NgIf,
    ToastModule,
    SidebarComponent,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Kavindra';
  isSidebarVisible = signal<boolean>(false);
  isBottomMessageVisible = signal<boolean>(true);
  onAccept: () => void = () => {
    this.isBottomMessageVisible.set(false);
    this.messageService.add({
      severity: 'success',
      summary: 'Info',
      detail: 'Thank you for acknowledging!',
      life: 3000,
    });
  };

  constructor(
    private readonly config: PrimeNGConfig,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {
    this.config.theme.set({
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });
    this.router.events
      .pipe(
        filter(
          (routerEvent): routerEvent is NavigationEnd =>
            routerEvent instanceof NavigationEnd,
        ),
        tap((event) => {
          this.isSidebarVisible.set(
            new RegExp(
              '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
            ).test(event.url.split('/')?.[1]),
          );
        }),
      )
      .subscribe();
  }
}
