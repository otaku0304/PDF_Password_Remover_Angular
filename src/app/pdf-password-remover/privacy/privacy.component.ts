import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements AfterViewInit {
  readonly year = new Date().getFullYear();
  readonly lastUpdated = new Date().toISOString().slice(0, 10);

  constructor(private readonly elRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const root = this.elRef.nativeElement;
    const els = root.querySelectorAll<HTMLElement>('.fade-in');
    if (!('IntersectionObserver' in globalThis)) {
      els.forEach((e) => e.classList.add('show'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            (en.target as HTMLElement).classList.add('show');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((e) => io.observe(e));
  }
}
