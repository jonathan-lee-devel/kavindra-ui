import {Component, signal} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent {
  menuIsOpen = signal<boolean>(false);
}
