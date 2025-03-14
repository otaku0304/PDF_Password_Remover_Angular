import { Component } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    standalone: false
})
export class LandingComponent {
  navigateToi18n() {
    window.location.href = 'https://i18n-6e819.web.app/en/#/home';
  }
}
