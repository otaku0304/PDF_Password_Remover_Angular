import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [RevealOnScrollDirective],
  standalone: true,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
