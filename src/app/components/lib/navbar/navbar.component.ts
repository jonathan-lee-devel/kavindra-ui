import {Component, signal} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isProductsDropdownVisible = signal<boolean>(false);
}
