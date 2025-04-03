import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class PdfBackendService {
  private readonly api = AppConfig.getAPIURI();

  constructor(private readonly http: HttpClient) {}

  unlockPdf(password: string, pdfFile: File) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('pdfFile', pdfFile);
    console.log(this.api);
    const observable = this.http.post(`${this.api}/remove_password`, formData, {
      responseType: 'blob',
    });
    return observable;
  }
}
