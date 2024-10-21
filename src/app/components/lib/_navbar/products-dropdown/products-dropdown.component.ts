import {Component, input, signal} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-products-dropdown',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './products-dropdown.component.html',
  styleUrl: './products-dropdown.component.scss'
})
export class ProductsDropdownComponent {
  isVisible = input.required<boolean>();
}
