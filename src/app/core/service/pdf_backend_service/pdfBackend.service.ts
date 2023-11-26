import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PdfBackendService {
  private apiUrl = 'https://pdf-password-remover.onrender.com';

  constructor(private http: HttpClient) {}

  unlockPdf(password: string, pdfFile: File) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('pdfFile', pdfFile);
    const observable = this.http.post(
      `${this.apiUrl}/remove_password`,
      formData,
      {
        responseType: 'blob',
      }
    );
    return observable;
  }
}
