import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';


@Component({
    template: `<div revealOnScroll>Test</div>`,
    imports: [RevealOnScrollDirective],
    standalone: true
})
class TestComponent { }

describe('RevealOnScrollDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RevealOnScrollDirective, TestComponent],
            providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
        });
        fixture = TestBed.createComponent(TestComponent);
    });

    it('should create an instance', () => {
        fixture.detectChanges();
        des = fixture.debugElement.queryAll(By.directive(RevealOnScrollDirective));
        expect(des.length).toBe(1);
    });

    it('should add fade-in class on init', () => {
        fixture.detectChanges();
        const div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
        expect(div.classList.contains('fade-in')).toBeTrue();
    });

    it('should use IntersectionObserver if available', () => {
        const mockIntersectionObserver = jasmine.createSpyObj('IntersectionObserver', ['observe', 'disconnect', 'unobserve']);
        (globalThis as any).IntersectionObserver = jasmine.createSpy('IntersectionObserver').and.returnValue(mockIntersectionObserver);

        fixture.detectChanges();

        expect((globalThis as any).IntersectionObserver).toHaveBeenCalled();
        expect(mockIntersectionObserver.observe).toHaveBeenCalled();
    });

    it('should show immediately if not browser', () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [RevealOnScrollDirective, TestComponent],
            providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
        });
        const serverFixture = TestBed.createComponent(TestComponent);
        serverFixture.detectChanges();

        const div = serverFixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
        expect(div.classList.contains('show')).toBeTrue();
    });

    it('should cleanup on destroy', () => {
        const mockIntersectionObserver = jasmine.createSpyObj('IntersectionObserver', ['observe', 'disconnect', 'unobserve']);
        (globalThis as any).IntersectionObserver = jasmine.createSpy('IntersectionObserver').and.returnValue(mockIntersectionObserver);

        fixture.detectChanges();
        fixture.destroy();

        expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
    });
});
