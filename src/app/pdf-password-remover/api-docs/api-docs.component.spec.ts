import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiDocsComponent } from './api-docs.component';
import { ApiDocsService } from 'src/app/core/service/pdf-api-docs/api-docs.service';
import { PLATFORM_ID } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiDocsComponent', () => {
  let component: ApiDocsComponent;
  let fixture: ComponentFixture<ApiDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiDocsComponent, HttpClientTestingModule],
      providers: [
        ApiDocsService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize endpoints on ngOnInit', () => {
    expect(component.endpoints.length).toBeGreaterThan(0);
    expect(component.endpoints[0].id).toBe('remove-password');
  });

  it('should validate partner label - required', () => {
    component.partnerLabel = '';
    expect(component.partnerLabelError).toBe('Partner label is required.');
  });

  it('should validate partner label - lowercase only', () => {
    component.partnerLabel = 'TestLabel';
    expect(component.partnerLabelError).toBe('Use lowercase letters only.');
  });

  it('should validate partner label - format', () => {
    component.partnerLabel = 'test_label!';
    expect(component.partnerLabelError).toBe('1–16 chars; lowercase letters, digits, or hyphens only.');
  });

  it('should validate partner label - valid', () => {
    component.partnerLabel = 'test-label-123';
    expect(component.partnerLabelError).toBe('');
  });

  it('should disable create when busy', () => {
    component.busy = true;
    component.partnerLabel = 'valid-label';
    expect(component.canCreate).toBeFalse();
  });

  it('should enable create when valid and not busy', () => {
    component.busy = false;
    component.partnerLabel = 'valid-label';
    expect(component.canCreate).toBeTrue();
  });

  it('should set and check active tab', () => {
    component.setTab('test-id', 'res');
    expect(component.isActive('test-id', 'res')).toBeTrue();
    expect(component.isActive('test-id', 'req')).toBeFalse();
  });

  it('should set and check active code tab', () => {
    component.setCodeTab('test-id', 'Python');
    expect(component.isCodeTab('test-id', 'Python')).toBeTrue();
    expect(component.isCodeTab('test-id', 'Node.js')).toBeFalse();
  });

  it('should return active code tab label', () => {
    component.setCodeTab('test-id', 'Go');
    expect(component.activeCodeTabLabel('test-id')).toBe('Go');
  });

  it('should return active sample', () => {
    const endpoint = component.endpoints[0];
    component.setCodeTab(endpoint.id, 'Python');
    const sample = component.activeSample(endpoint);
    expect(sample).toContain('import');
  });

  it('should mask values correctly', () => {
    expect(component.mask('1234567890', 4, 4)).toBe('1234••••••••7890');
    expect(component.mask('short', 4, 4)).toBe('short');
    expect(component.mask('', 4, 4)).toBe('');
  });
});
