import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursorComponent } from './cursor.component'

describe('CursorComponent', () => {
  let component: CursorComponent;
  let fixture: ComponentFixture<CursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CursorComponent);
    component = fixture.componentInstance;

    const cursorEl = document.createElement('div');
    cursorEl.classList.add('cursor');
    fixture.nativeElement.appendChild(cursorEl);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update cursor style and color on mousemove', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 150,
    });

    spyOn(component['renderer'], 'setStyle').and.callThrough();
    spyOn(component['renderer'], 'addClass').and.callThrough();
    spyOn(component['renderer'], 'removeClass').and.callThrough();

    document.dispatchEvent(event);

    const cursor = fixture.nativeElement.querySelector('.cursor');

    expect(cursor.style.left).toBe('100px');
    expect(cursor.style.top).toBe('150px');
    expect(component['renderer'].setStyle).toHaveBeenCalledTimes(3);
    expect(component['renderer'].removeClass).toHaveBeenCalled();
  });

  it('should add over-text class if hovering over a link', () => {
    const link = document.createElement('a');
    link.style.position = 'absolute';
    link.style.left = '200px';
    link.style.top = '200px';
    link.style.width = '50px';
    link.style.height = '20px';
    document.body.appendChild(link);

    const rect = link.getBoundingClientRect();
    const event = new MouseEvent('mousemove', {
      clientX: rect.left + 5,
      clientY: rect.top + 5,
    });

    spyOn(component['renderer'], 'addClass');
    document.dispatchEvent(event);

    expect(component['renderer'].addClass).toHaveBeenCalledWith(
      jasmine.anything(),
      'over-text'
    );

    document.body.removeChild(link);
  });

  it('should cycle cursor color correctly', () => {
    const totalColors = (component as any).colors.length;

    for (let i = 0; i < totalColors + 1; i++) {
      const event = new MouseEvent('mousemove', {
        clientX: 10,
        clientY: 10,
      });
      document.dispatchEvent(event);
    }

    expect(component['currentColorIndex']).toBe(1);});
});
