import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "primeng/api";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    SharedModule,
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
}
