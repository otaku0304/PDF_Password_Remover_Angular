// src/app/core/service/pdf-api-docs/api-docs.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

export interface CreatedKey {
  api_key: string;
  api_secret: string;
  label: string;
  created_at: string;
  name: string;
}

export interface KeyRow {
  api_key: string;
  label: string;
  created_at: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiDocsService {
  private readonly api = AppConfig.getAPIURI();

  constructor(private readonly http: HttpClient) {}

  createKey(name: string) {
    return this.http.post<CreatedKey>(`${this.api}/api/key/generate`, { name });
  }

  deleteKey(keyId: string) {
    return this.http.delete<{ ok: boolean }>(
      `${this.api}/api/keys/${encodeURIComponent(keyId)}`
    );
  }
}
