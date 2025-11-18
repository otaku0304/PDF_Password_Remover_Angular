import {
  Directive,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[revealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  private io?: IntersectionObserver;
  private readonly isBrowser: boolean = false;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;
    el.classList.add('fade-in');

    if (!this.isBrowser || !('IntersectionObserver' in globalThis)) {
      el.classList.add('show');
      return;
    }

    this.io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            el.classList.add('show');
            this.io?.unobserve(el);
          }
        }
      },
      { threshold: 0.15 }
    );

    this.io.observe(el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
