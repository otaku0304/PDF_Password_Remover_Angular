import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private selectedPdfFile: File | undefined;
  private encryptionStatusSubject = new BehaviorSubject<boolean>(false);

  getEncryptionStatusObservable() {
    return this.encryptionStatusSubject.asObservable();
  }

  setEncryptionStatus(encryptionStatus: boolean) {
    this.encryptionStatusSubject.next(encryptionStatus);
  }

  setSelectedPdfFile(file: File) {
    this.selectedPdfFile = file;
  }

  getSelectedPdfFile(): File | undefined {
    return this.selectedPdfFile;
  }
}
