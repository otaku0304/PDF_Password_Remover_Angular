import { Component } from '@angular/core';
import { AppConfig } from 'src/app/core/config/app.config';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: [],
  standalone: false,
})
export class LandingComponent {
  private readonly navigateToI18n = AppConfig.getI18nUrl();

  navigateToi18n() {
    window.location.href = `${this.navigateToI18n}`;
  }
}
