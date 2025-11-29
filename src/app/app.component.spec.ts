import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Title, Meta } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppConfig } from './core/config/app.config';

describe('AppComponent', () => {


  beforeEach(async () => {
    const mockTitle = jasmine.createSpyObj('Title', ['setTitle']);
    const mockMeta = jasmine.createSpyObj('Meta', ['updateTag']);

    spyOn(AppConfig, 'getSiteURL').and.returnValue('https://pdf-removal.web.app');

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Title, useValue: mockTitle },
        { provide: Meta, useValue: mockMeta },
        provideRouter([])
      ],
    }).compileComponents();


  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize and set up router event subscription', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
