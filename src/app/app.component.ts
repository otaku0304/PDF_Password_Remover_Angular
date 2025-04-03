import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AppConfig } from './core/config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private readonly siteUrl = AppConfig.getSiteURL();
  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data;
        })
      )
      .subscribe((routeData) => {
        const currentUrl = `${this.siteUrl}${this.router.url}`;
        if (routeData) {
          this.title.setTitle(routeData['title'] || 'Default Title');
          this.meta.updateTag({
            name: 'description',
            content: routeData['description'] || 'Default Description',
          });
          this.meta.updateTag({ name: 'canonical', content: currentUrl });
          this.meta.updateTag({ property: 'og:url', content: currentUrl });
        }
      });
  }
}
