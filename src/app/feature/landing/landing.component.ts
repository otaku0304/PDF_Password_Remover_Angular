import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppConfig } from 'src/app/core/config/app.config';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: [],
  standalone: true,
  imports: [RouterLink],
})
export class LandingComponent {
  private readonly navigateToI18n = AppConfig.getI18nUrl();

  navigateToi18n() {
    window.location.href = `${this.navigateToI18n}`;
  }
}
