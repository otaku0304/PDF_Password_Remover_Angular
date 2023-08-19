import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private encryptionStatusSubject = new BehaviorSubject<boolean>(false);

  getEncryptionStatusObservable() {
    return this.encryptionStatusSubject.asObservable();
  }

  setEncryptionStatus(encryptionStatus: boolean) {
    this.encryptionStatusSubject.next(encryptionStatus);
  }
}
