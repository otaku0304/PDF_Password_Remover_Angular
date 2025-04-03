import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
  standalone: false,
})
export class HeaderComponent {
  constructor(
    private readonly location: Location,
    private readonly router: Router
  ) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToBack() {
    this.location.back();
  }
}
