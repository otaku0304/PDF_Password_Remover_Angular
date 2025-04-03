import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss'],
  standalone: false,
})
export class CursorComponent {
  private readonly colors = [
    '#ffb56b',
    '#fdaf69',
    '#f89d63',
    '#f59761',
    '#ef865e',
    '#ec805d',
    '#e36e5c',
    '#df685c',
    '#d5585c',
    '#d1525c',
    '#c5415d',
    '#c03b5d',
    '#b22c5e',
    '#ac265e',
    '#9c155f',
    '#950f5f',
    '#830060',
    '#7c0060',
    '#680060',
    '#60005f',
    '#48005f',
    '#3d005e',
    // Additional colors
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#FFA500',
    '#800080',
    '#008080',
    '#800000',
    '#008000',
    '#000080',
    '#808000',
    '#808080',
    '#C0C0C0',
    '#FFC0CB',
    '#800080',
    '#FF00FF',
    '#00FFFF',
    '#808080',
    '#FFFFFF',
  ];

  private currentColorIndex = 0;

  constructor(
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const cursor = this.el.nativeElement.querySelector('.cursor');
    if (cursor) {
      const x = e.clientX;
      const y = e.clientY;

      this.renderer.setStyle(cursor, 'left', x + 'px');
      this.renderer.setStyle(cursor, 'top', y + 'px');

      this.currentColorIndex =
        (this.currentColorIndex + 1) % this.colors.length;
      const newColor = this.colors[this.currentColorIndex];
      this.renderer.setStyle(cursor, 'background-color', newColor);

      const elementMouseIsOver = document.elementFromPoint(x, y);
      if (
        elementMouseIsOver &&
        elementMouseIsOver.tagName.toLowerCase() === 'a'
      ) {
        this.renderer.addClass(cursor, 'over-text');
      } else {
        this.renderer.removeClass(cursor, 'over-text');
      }
    }
  }
}
