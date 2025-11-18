import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

@Injectable({ providedIn: 'root' })
export class PdfBackendService {
  private readonly api = AppConfig.getAPIURI();

  constructor(private readonly http: HttpClient) {}

  removePassword(form: FormData, reqToken: string) {
    const headers = new HttpHeaders({ 'X-REQ-TOKEN': reqToken });
    return this.http.post(`${this.api}/api/remove_password`, form, {
      headers,
      responseType: 'blob',
    });
  }
}
