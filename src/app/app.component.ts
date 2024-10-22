import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Aura } from 'primeng/themes/aura';

import { BottomFullWidthMessageComponent } from './components/lib/_messages/bottom-full-width-message/bottom-full-width-message.component';
import { NavbarComponent } from './components/lib/_navbar/navbar/navbar.component';
import { FooterComponent } from './components/lib/footer/footer.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Kavindra';
  isBottomMessageVisible = signal<boolean>(true);
  onAccept: () => void = () => {
    this.isBottomMessageVisible.set(false);
  };

  constructor(private readonly config: PrimeNGConfig) {
    this.config.theme.set({
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });
  }
}
