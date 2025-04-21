import { TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';

describe('PdfService', () => {
  let service: PdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Encryption Status', () => {
    it('should return default encryption status as false', (done) => {
      service.getEncryptionStatusObservable().subscribe((status) => {
        expect(status).toBeFalse();
        done();
      });
    });

    it('should update and emit encryption status', (done) => {
      service.setEncryptionStatus(true);

      service.getEncryptionStatusObservable().subscribe((status) => {
        expect(status).toBeTrue();
        done();
      });
    });
  });

  describe('Selected PDF File', () => {
    it('should initially return undefined', () => {
      expect(service.getSelectedPdfFile()).toBeUndefined();
    });

    it('should set and get the selected PDF file', () => {
      const mockFile = new File(['test'], 'test.pdf', {
        type: 'application/pdf',
      });

      service.setSelectedPdfFile(mockFile);
      const file = service.getSelectedPdfFile();

      expect(file).toBeDefined();
      expect(file?.name).toBe('test.pdf');
      expect(file?.type).toBe('application/pdf');
    });
  });
});
