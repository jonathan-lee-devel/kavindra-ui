import {Component, signal} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {ProductsDropdownComponent} from '../products-dropdown/products-dropdown.component';
import {FeaturesDropdownComponent} from '../features-dropdown/features-dropdown.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    ProductsDropdownComponent,
    FeaturesDropdownComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isProductsDropdownVisible = signal<boolean>(false);
  isFeaturesDropdownVisible = signal<boolean>(false);
}