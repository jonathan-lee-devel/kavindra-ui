import { NgClass, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductsDropdownComponent } from '../products-dropdown/products-dropdown.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, NgClass, ProductsDropdownComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isProductsDropdownVisible = signal<boolean>(false);
}
