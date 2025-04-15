import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppConfig } from '../../config/app.config';
import { PdfBackendService } from './pdfBackend.service';

describe('PdfBackendService', () => {
  let service: PdfBackendService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PdfBackendService],
    });

    service = TestBed.inject(PdfBackendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to unlock PDF', () => {
    const mockFile = new File(['dummy content'], 'test.pdf', {
      type: 'application/pdf',
    });

    const password = 'secret';
    const expectedUrl = `${AppConfig.getAPIURI()}/remove_password`;

    service.unlockPdf(password, mockFile).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    expect(req.request.responseType).toBe('blob');

    const body = req.request.body as FormData;
    expect(body.has('password')).toBeTrue();
    expect(body.has('pdfFile')).toBeTrue();

    req.flush(new Blob());
  });
});
