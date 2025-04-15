import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AppConfig } from './core/config/app.config';

describe('AppComponent with route data', () => {
  let titleService: jasmine.SpyObj<Title>;
  let metaService: jasmine.SpyObj<Meta>;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject();

    const mockTitle = jasmine.createSpyObj('Title', ['setTitle']);
    const mockMeta = jasmine.createSpyObj('Meta', ['updateTag']);
    const mockRouter = {
      events: routerEvents$,
      url: '/test',
    };

    const fakeActivatedRoute = {
      firstChild: {
        firstChild: {
          snapshot: {
            data: {
              title: 'Test Page',
              description: 'This is a test description',
            },
          },
        },
      },
    };

    spyOn(AppConfig, 'getSiteURL').and.returnValue('https://pdf-removal.web.app');

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Title, useValue: mockTitle },
        { provide: Meta, useValue: mockMeta },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    titleService = TestBed.inject(Title) as jasmine.SpyObj<Title>;
    metaService = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set title and meta tags on NavigationEnd', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    routerEvents$.next(new NavigationEnd(1, '/test', '/test'));
    const expectedUrl = 'https://pdf-removal.web.app/test';

    expect(titleService.setTitle).toHaveBeenCalledWith('Test Page');
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'This is a test description',
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'canonical',
      content: expectedUrl,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: expectedUrl,
    });
  });
});

describe('AppComponent with default meta values', () => {
  let titleService: jasmine.SpyObj<Title>;
  let metaService: jasmine.SpyObj<Meta>;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject();

    const mockTitle = jasmine.createSpyObj('Title', ['setTitle']);
    const mockMeta = jasmine.createSpyObj('Meta', ['updateTag']);
    const mockRouter = {
      events: routerEvents$,
      url: '/test-default',
    };

    const mockActivatedRoute = {
      firstChild: {
        firstChild: {
          snapshot: {
            data: {},
          },
        },
      },
    };

    spyOn(AppConfig, 'getSiteURL').and.returnValue('https://pdf-removal.web.app');

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Title, useValue: mockTitle },
        { provide: Meta, useValue: mockMeta },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    titleService = TestBed.inject(Title) as jasmine.SpyObj<Title>;
    metaService = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
  });

  it('should use default title and description if not provided in route data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    routerEvents$.next(new NavigationEnd(1, '/test-default', '/test-default'));
    const expectedUrl = 'https://pdf-removal.web.app/test-default';

    expect(titleService.setTitle).toHaveBeenCalledWith('Default Title');
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Default Description',
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'canonical',
      content: expectedUrl,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: expectedUrl,
    });
  });
});
