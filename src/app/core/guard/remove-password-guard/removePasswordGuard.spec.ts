import { TestBed } from '@angular/core/testing';
import { PdfService } from '../../service/pdf/pdf.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RemovePasswordGuard } from './removePasswordGuard';

describe('RemovePasswordGuard', () => {
  let guard: RemovePasswordGuard;
  let pdfServiceSpy: jasmine.SpyObj<PdfService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    pdfServiceSpy = jasmine.createSpyObj('PdfService', ['getEncryptionStatusObservable']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RemovePasswordGuard,
        { provide: PdfService, useValue: pdfServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(RemovePasswordGuard);
  });

  it('should allow activation when encryption status is true', (done) => {
    pdfServiceSpy.getEncryptionStatusObservable.and.returnValue(of(true));

    guard.canActivate({} as any, {} as any).subscribe((result) => {
      expect(result).toBeTrue();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should block activation and navigate when encryption status is false', (done) => {
    pdfServiceSpy.getEncryptionStatusObservable.and.returnValue(of(false));

    guard.canActivate({} as any, {} as any).subscribe((result) => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });
});
