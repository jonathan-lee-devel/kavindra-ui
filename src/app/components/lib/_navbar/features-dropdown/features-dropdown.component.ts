import {Component, input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-features-dropdown',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './features-dropdown.component.html',
  styleUrl: './features-dropdown.component.scss'
})
export class FeaturesDropdownComponent {
  isVisible = input.required<boolean>();
}
