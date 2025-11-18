import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './config/app.config';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly api = AppConfig.getAPIURI();

  constructor(private readonly http: HttpClient) {}

  getReqToken() {
    return this.http.post<{ req_token: string }>(`${this.api}/api/prepare`, {});
  }
}
