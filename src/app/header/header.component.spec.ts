import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { PLATFORM_ID } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const mockLocalStorage = {
      getItem: jasmine.createSpy('getItem').and.returnValue(null),
      setItem: jasmine.createSpy('setItem'),
      clear: jasmine.createSpy('clear')
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with system theme', () => {
    expect(component.currentPref).toBe('system');
    expect(component.label).toBe('System');
  });

  it('should toggle theme correctly', () => {
    // System -> Dark
    component.toggleTheme();
    expect(component.currentPref).toBe('dark');
    expect(component.label).toBe('Dark');

    // Dark -> Light
    component.toggleTheme();
    expect(component.currentPref).toBe('light');
    expect(component.label).toBe('Light');

    // Light -> System
    component.toggleTheme();
    expect(component.currentPref).toBe('system');
    expect(component.label).toBe('System');
  });

  it('should apply theme to document', () => {


    component.toggleTheme(); // System -> Dark
    expect(document.documentElement.dataset['bsTheme']).toBe('dark');

    component.toggleTheme(); // Dark -> Light
    expect(document.documentElement.dataset['bsTheme']).toBe('light');
  });
});
