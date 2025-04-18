import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemovePasswordComponent } from './remove-password.component';
import { of, throwError } from 'rxjs';
import { PdfService } from '../../core/service/pdf/pdf.service';
import { PdfBackendService } from '../../core/service/pdf_backend_service/pdfBackend.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

describe('RemovePasswordComponent', () => {
  let component: RemovePasswordComponent;
  let fixture: ComponentFixture<RemovePasswordComponent>;
  let pdfService: jasmine.SpyObj<PdfService>;
  let pdfBackendService: jasmine.SpyObj<PdfBackendService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const mockPdfService = jasmine.createSpyObj('PdfService', [
      'getSelectedPdfFile',
    ]);
    const mockPdfBackendService = jasmine.createSpyObj('PdfBackendService', [
      'unlockPdf',
    ]);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RemovePasswordComponent, HttpClientModule],
      providers: [
        { provide: PdfService, useValue: mockPdfService },
        { provide: PdfBackendService, useValue: mockPdfBackendService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RemovePasswordComponent);
    component = fixture.componentInstance;
    pdfService = TestBed.inject(PdfService) as jasmine.SpyObj<PdfService>;
    pdfBackendService = TestBed.inject(
      PdfBackendService
    ) as jasmine.SpyObj<PdfBackendService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.isHidePassword).toBe(false);
    component.toggleShowPassword();
    expect(component.isHidePassword).toBe(true);
  });

  it('should unlock PDF successfully and emit event', () => {
    const mockBlob = new Blob(['dummy content'], { type: 'application/pdf' });
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });

    pdfService.getSelectedPdfFile.and.returnValue(file);
    pdfBackendService.unlockPdf.and.returnValue(of(mockBlob));

    spyOn(component.unlockSuccess, 'emit');
    spyOn(document, 'createElement').and.callFake(() => {
      return {
        href: '',
        download: '',
        click: jasmine.createSpy('click'),
      } as any;
    });

    component.password = 'correct-password'; // NOSONAR
    component.unlockPDF();
    expect(pdfBackendService.unlockPdf).toHaveBeenCalledWith(
      'correct-password',
      file
    );
    expect(router.navigate).toHaveBeenCalledWith(['/pdf/download']);
    expect(component.unlockSuccess.emit).toHaveBeenCalledWith(
      'PDF unlocked successfully'
    );
  });

  it('should show error for 400 - incorrect password', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });

    pdfService.getSelectedPdfFile.and.returnValue(file);
    pdfBackendService.unlockPdf.and.returnValue(
      throwError(() => ({ status: 400 }))
    );
    component.password = 'wrong-password'; // NOSONAR
    component.unlockPDF();

    expect(component.error).toBe(
      'Incorrect password. Please check and try again.'
    );
  });

  it('should show error for 500 - server error', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });

    pdfService.getSelectedPdfFile.and.returnValue(file);
    pdfBackendService.unlockPdf.and.returnValue(
      throwError(() => ({ status: 500 }))
    );

    component.unlockPDF();

    expect(component.error).toBe(
      'An error occurred on the server while unlocking the PDF.'
    );
  });

  it('should show generic error for unknown error', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });

    pdfService.getSelectedPdfFile.and.returnValue(file);
    pdfBackendService.unlockPdf.and.returnValue(
      throwError(() => ({ status: 0 }))
    );

    component.unlockPDF();

    expect(component.error).toBe('An error occurred while unlocking the PDF.');
  });
});
