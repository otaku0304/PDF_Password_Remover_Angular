import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AppConfig } from './core/config/app.config';

describe('AppComponent', () => {
  let titleService: jasmine.SpyObj<Title>;
  let metaService: jasmine.SpyObj<Meta>;
  let routerEvents$: Subject<any>;

  const setup = async (routeData: any, url = '/test') => {
    routerEvents$ = new Subject();
    console.log();
    const mockTitle = jasmine.createSpyObj('Title', ['setTitle']);
    const mockMeta = jasmine.createSpyObj('Meta', ['updateTag']);
    const mockRouter = {
      events: routerEvents$,
      url,
    };

    const mockActivatedRoute = {
      firstChild: {
        firstChild: {
          snapshot: { data: routeData },
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
  };

  it('should create the app', async () => {
    await setup({ title: 'Test Page', description: 'Test description' });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set meta from route data', async () => {
    await setup({ title: 'Test Page', description: 'This is a test description' }, '/test');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const expectedUrl = 'https://pdf-removal.web.app/test';
    routerEvents$.next(new NavigationEnd(1, '/test', '/test'));

    expect(titleService.setTitle).toHaveBeenCalledWith('Test Page');
    expectMetaTags(expectedUrl, 'This is a test description');
  });

  it('should set default meta when no route data is present', async () => {
    await setup({}, '/test-default');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const expectedUrl = 'https://pdf-removal.web.app/test-default';
    routerEvents$.next(new NavigationEnd(1, '/test-default', '/test-default'));

    expect(titleService.setTitle).toHaveBeenCalledWith('Default Title');
    expectMetaTags(expectedUrl, 'Default Description');
  });

  function expectMetaTags(url: string, desc: string) {
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: desc,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'canonical',
      content: url,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: url,
    });
  }
});
