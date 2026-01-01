import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiDocsService, CreatedKey } from './api-docs.service';
import { AppConfig } from '../../config/app.config';

describe('ApiDocsService', () => {
    let service: ApiDocsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiDocsService]
        });
        service = TestBed.inject(ApiDocsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create a key', () => {
        const mockKey: CreatedKey = {
            api_key: 'key123',
            api_secret: 'secret123',
            label: 'Test Key',
            created_at: '2023-01-01',
            name: 'Test Key'
        };
        const apiUri = AppConfig.getAPIURI();

        service.createKey('Test Key').subscribe(key => {
            expect(key).toEqual(mockKey);
        });

        const req = httpMock.expectOne(`${apiUri}/api/key/generate`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ name: 'Test Key' });
        req.flush(mockKey);
    });

    it('should delete a key', () => {
        const apiUri = AppConfig.getAPIURI();
        const keyId = 'key123';

        service.deleteKey(keyId).subscribe(response => {
            expect(response.ok).toBeTrue();
        });

        const req = httpMock.expectOne(`${apiUri}/api/keys/${keyId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({ ok: true });
    });
});
