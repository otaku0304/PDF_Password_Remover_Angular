import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { AppConfig } from '../../core/config/app.config';
import { ActivatedRoute } from '@angular/router';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  const mockI18nUrl = 'https://example.com/i18n';
  const fakeActivatedRoute = {
    snapshot: {
      data: {},
      paramMap: {
        get: function (key) {
          return 'abc';
        },
      },
    },
  } as ActivatedRoute;

  beforeEach(async () => {
    spyOn(AppConfig, 'getI18nUrl').and.returnValue(mockI18nUrl);

    await TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
});
