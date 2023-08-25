import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  navigateToi18n() {
    window.location.href = 'https://otaku0304.github.io/i18n-Angular-Built-In/';
  }
}
