import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { AppConfig } from './config/app.config';

describe('TokenService', () => {
    let service: TokenService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TokenService]
        });
        service = TestBed.inject(TokenService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve a request token', () => {
        const mockResponse = { req_token: '12345' };
        const apiUri = AppConfig.getAPIURI();

        service.getReqToken().subscribe(response => {
            expect(response.req_token).toBe('12345');
        });

        const req = httpMock.expectOne(`${apiUri}/api/prepare`);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });
});
