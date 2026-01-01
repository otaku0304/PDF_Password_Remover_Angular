import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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

  it('should send a POST request to remove password', () => {
    const formData = new FormData();
    formData.append('test', 'data');
    const reqToken = 'token123';
    const expectedUrl = `${AppConfig.getAPIURI()}/api/remove_password`;

    service.removePassword(formData, reqToken).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(formData);
    expect(req.request.headers.get('X-REQ-TOKEN')).toBe(reqToken);
    expect(req.request.responseType).toBe('blob');

    req.flush(new Blob());
  });
});
