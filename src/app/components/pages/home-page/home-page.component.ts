import {Component} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  projects: unknown[] = [];
}
