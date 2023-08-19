import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PdfService } from '../../service/pdf/pdf.service';

@Injectable({
  providedIn: 'root',
})
export class RemovePasswordGuard implements CanActivate {
  constructor(private pdfService: PdfService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.pdfService.getEncryptionStatusObservable().pipe(
      map((encryptionStatus) => {
        if (encryptionStatus) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
