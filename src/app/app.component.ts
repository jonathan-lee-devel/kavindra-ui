import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';
import {Aura} from 'primeng/themes/aura';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {FooterComponent} from './components/lib/footer/footer.component';
import {NavbarComponent} from './components/lib/_navbar/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, DialogModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kavindra-ui';

  constructor(private readonly config: PrimeNGConfig) {
    this.config.theme.set({
      preset: Aura, options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        }
      }
    });
  }
}
