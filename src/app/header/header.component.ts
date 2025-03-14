import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent {
  constructor(private location: Location, private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
  navigateToBack() {
    this.location.back();
  }
}
