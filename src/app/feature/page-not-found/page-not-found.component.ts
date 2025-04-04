import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    standalone: true,
})
export class PageNotFoundComponent {
  constructor(private readonly router: Router) {}
  home() {
    this.router.navigate(['/']);
  }
}
