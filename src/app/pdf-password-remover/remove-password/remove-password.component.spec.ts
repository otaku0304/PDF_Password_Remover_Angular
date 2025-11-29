import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemovePasswordComponent } from './remove-password.component';
import { TokenService } from '../../core/token.service';
import { PdfBackendService } from 'src/app/core/service/pdf_backend_service/pdfBackend.service';
import { throwError, of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RemovePasswordComponent', () => {
  const TEST_PASSWORD_FIXTURE = 'test-fixture-pwd-123'; // Test fixture, not a real password

  let component: RemovePasswordComponent;
  let fixture: ComponentFixture<RemovePasswordComponent>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let pdfBackendService: jasmine.SpyObj<PdfBackendService>;


  beforeEach(async () => {
    const mockTokenService = jasmine.createSpyObj('TokenService', ['getReqToken']);
    const mockPdfBackendService = jasmine.createSpyObj('PdfBackendService', ['removePassword']);

    await TestBed.configureTestingModule({
      imports: [RemovePasswordComponent, NoopAnimationsModule],
      providers: [
        { provide: TokenService, useValue: mockTokenService },
        { provide: PdfBackendService, useValue: mockPdfBackendService },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    pdfBackendService = TestBed.inject(PdfBackendService) as jasmine.SpyObj<PdfBackendService>;


    fixture = TestBed.createComponent(RemovePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.toggleShowPassword();
    expect(component.showPassword).toBeTrue();
    component.toggleShowPassword();
    expect(component.showPassword).toBeFalse();
  });

  it('should show error when no file is selected', () => {
    const mockInput = document.createElement('input');
    mockInput.type = 'file';

    component.onSubmit(mockInput);

    expect(component.status).toBe('Please choose a PDF and enter password.');
  });

  it('should show error when no password is entered', () => {
    const mockInput = document.createElement('input');
    mockInput.type = 'file';
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    mockInput.files = dataTransfer.files;

    component.password = '';
    component.onSubmit(mockInput);

    expect(component.status).toBe('Please choose a PDF and enter password.');
  });

  it('should show error for non-PDF files', () => {
    const mockInput = document.createElement('input');
    mockInput.type = 'file';
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    mockInput.files = dataTransfer.files;

    component.password = TEST_PASSWORD_FIXTURE;
    component.onSubmit(mockInput);

    expect(component.status).toBe('Only PDF files are supported.');
  });

  it('should handle token service error', (done) => {
    const mockInput = document.createElement('input');
    mockInput.type = 'file';
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    mockInput.files = dataTransfer.files;

    component.password = TEST_PASSWORD_FIXTURE;

    tokenService.getReqToken.and.returnValue(throwError(() => new Error('Token error')));

    component.onSubmit(mockInput);

    setTimeout(() => {
      expect(component.loading).toBeFalse();
      expect(component.status).toBe('Could not prepare request.');
      done();
    }, 100);
  });

  it('should handle successful PDF processing', (done) => {
    const mockInput = document.createElement('input');
    mockInput.type = 'file';
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    mockInput.files = dataTransfer.files;

    component.password = TEST_PASSWORD_FIXTURE;

    const mockBlob = new Blob(['pdf content'], { type: 'application/pdf' });
    tokenService.getReqToken.and.returnValue(of({ req_token: 'test-token' }));
    pdfBackendService.removePassword.and.returnValue(of(mockBlob));

    component.onSubmit(mockInput);

    setTimeout(() => {
      expect(component.loading).toBeFalse();
      expect(component.status).toBe('Done! Click to download.');
      expect(component.downloadHref).toBeTruthy();
      done();
    }, 100);
  });

  it('should handle PDF processing error with retry', (done) => {
    const mockInput = document.createElement('input');
    mockInput.type = 'file';
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    mockInput.files = dataTransfer.files;

    component.password = TEST_PASSWORD_FIXTURE;

    tokenService.getReqToken.and.returnValue(of({ req_token: 'test-token' }));
    pdfBackendService.removePassword.and.returnValue(
      throwError(() => ({ headers: { get: () => 'bad_token' } }))
    );

    component.onSubmit(mockInput);

    setTimeout(() => {
      expect(tokenService.getReqToken).toHaveBeenCalledTimes(2); // Initial + retry
      done();
    }, 200);
  });

  it('should handle unexpected response type', (done) => {
    const mockInput = document.createElement('input');
    mockInput.type = 'file';
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    mockInput.files = dataTransfer.files;

    component.password = TEST_PASSWORD_FIXTURE;

    tokenService.getReqToken.and.returnValue(of({ req_token: 'test-token' }));
    pdfBackendService.removePassword.and.returnValue(of('not a blob' as any));

    component.onSubmit(mockInput);

    setTimeout(() => {
      expect(component.status).toBe('Unexpected response.');
      done();
    }, 100);
  });

  it('should handle error with blob payload', (done) => {
    const mockInput = document.createElement('input');
    mockInput.type = 'file';
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    mockInput.files = dataTransfer.files;

    component.password = TEST_PASSWORD_FIXTURE;

    const errorBlob = new Blob([JSON.stringify({ error: 'Test error' })], { type: 'application/json' });
    tokenService.getReqToken.and.returnValue(of({ req_token: 'test-token' }));
    pdfBackendService.removePassword.and.returnValue(
      throwError(() => ({ error: errorBlob }))
    );

    component.onSubmit(mockInput);

    setTimeout(() => {
      expect(component.loading).toBeFalse();
      expect(component.status).toContain('error');
      done();
    }, 200);
  });
});
