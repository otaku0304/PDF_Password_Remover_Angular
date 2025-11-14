import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

export interface CreatedKey {
  api_key: string;
  api_secret: string; 
  label: string;
  created_at: string;
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

  createKey(label: string, adminToken: string) {
    const headers = new HttpHeaders({ 'X-ADMIN-TOKEN': adminToken });
    return this.http.post<CreatedKey>(
      `${this.api}/api/admin/keys`,
      { label },
      { headers }
    );
  }

  listKeys(adminToken: string) {
    const headers = new HttpHeaders({ 'X-ADMIN-TOKEN': adminToken });
    return this.http.get<{ keys: KeyRow[] }>(`${this.api}/api/admin/keys`, {
      headers,
    });
  }

  deleteKey(keyId: string, adminToken: string) {
    const headers = new HttpHeaders({ 'X-ADMIN-TOKEN': adminToken });
    return this.http.delete<{ ok: boolean }>(
      `${this.api}/api/admin/keys/${encodeURIComponent(keyId)}`,
      { headers }
    );
  }
}
