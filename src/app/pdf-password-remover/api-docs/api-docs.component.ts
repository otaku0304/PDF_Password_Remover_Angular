import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf, *ngFor
import { FormsModule } from '@angular/forms';
import {
  ApiDocsService,
  CreatedKey,
  KeyRow,
} from 'src/app/core/service/pdf-api-docs/api-docs.service';

@Component({
  selector: 'app-api-docs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.scss'],
})
export class ApiDocsComponent implements OnInit {
  // Admin
  adminToken = '';
  partnerLabel = '';
  keys: KeyRow[] = [];
  lastCreated?: CreatedKey;
  busy = false;
  error = '';

  // URLs
  apiBase = '';
  removeHmacUrl = '';

  // Samples (rendered with [textContent])
  curlThirdPartySample = '';
  successNote = '';
  errorSamples: Array<{ title: string; status: string; body: string }> = [];

  constructor(private readonly svc: ApiDocsService) {}

  ngOnInit(): void {
    this.apiBase =
      window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : (this.svc as { base?: string }).base || '';

    this.removeHmacUrl = `${this.apiBase}/api/v1/remove_password`;

    // --- Request sample (curl) ---
    this.curlThirdPartySample = `TS=$(date +%s)
# BODY_HEX must be SHA-256 of the EXACT multipart bytes you will send.
# Compute this in your server code (languages differ); shells usually can't.
SIG=<precomputed_hex_hmac_over:
  "POST\\n/api/v1/remove_password\\n$TS\\n<BODY_HEX>"
  using your API secret>

curl -X POST '${this.removeHmacUrl}' \
  -H "X-API-KEY: <API_KEY>" \
  -H "X-API-TIMESTAMP: $TS" \
  -H "X-API-SIGNATURE: $SIG" \
  -F "file=@/path/protected.pdf" \
  -F "password=secret" --output unlocked.pdf`;

    // --- Success note ---
    this.successNote = `HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="unlocked.pdf"

<binary PDF stream>`;

    // --- Error samples (exact shapes from backend) ---
    this.errorSamples = [
      {
        title: 'Missing headers',
        status: '401 Unauthorized',
        body: `{"error":"missing_headers"}`,
      },
      {
        title: 'Unknown API key',
        status: '401 Unauthorized',
        body: `{"error":"bad_api_key"}`,
      },
      {
        title: 'Bad timestamp',
        status: '401 Unauthorized',
        body: `{"error":"bad_timestamp"}`,
      },
      {
        title: 'Clock skew > 5m',
        status: '401 Unauthorized',
        body: `{"error":"skew"}`,
      },
      {
        title: 'Signature mismatch',
        status: '401 Unauthorized',
        body: `{"error":"bad_signature"}`,
      },
      {
        title: 'Missing file/password',
        status: '400 Bad Request',
        body: `{"error":"Missing file or password"}`,
      },
      {
        title: 'Only PDFs allowed',
        status: '400 Bad Request',
        body: `{"error":"Only PDF files are supported"}`,
      },
      {
        title: 'Wrong PDF password',
        status: '400 Bad Request',
        body: `{"error":"Incorrect password"}`,
      },
      {
        title: 'Processing error',
        status: '500 Internal Server Error',
        body: `{"error":"processing_error: <details>"}`,
      },
    ];
  }

  // Admin actions (unchanged)
  refresh(): void {
    if (!this.adminToken) {
      this.error = 'Enter the admin token to list keys.';
      return;
    }
    this.error = '';
    this.svc.listKeys(this.adminToken).subscribe({
      next: (res) => {
        this.keys = res?.keys ?? [];
      },
      error: (e) => {
        this.error = e?.error?.error || 'Failed to fetch keys';
      },
    });
  }

  create(): void {
    if (!this.adminToken) {
      this.error = 'Enter the admin token to create a key.';
      return;
    }
    const label = (this.partnerLabel || '').trim() || 'partner';
    this.busy = true;
    this.error = '';
    this.svc.createKey(label, this.adminToken).subscribe({
      next: (res) => {
        if (!res) {
          this.error = 'Create failed (empty response)';
          this.busy = false;
          return;
        }
        this.lastCreated = res;
        this.partnerLabel = '';
        this.busy = false;
        this.refresh();
      },
      error: (e) => {
        this.busy = false;
        this.error = e?.error?.error || 'Create failed';
      },
    });
  }

  delete(kid: string): void {
    if (!this.adminToken) {
      this.error = 'Enter the admin token to delete keys.';
      return;
    }
    if (!confirm(`Delete key ${kid}? This cannot be undone.`)) return;
    this.svc.deleteKey(kid, this.adminToken).subscribe({
      next: () => this.refresh(),
      error: (e) => {
        this.error = e?.error?.error || 'Delete failed';
      },
    });
  }

  copy(text: string): void {
    if (!text) return;
    navigator.clipboard.writeText(text);
  }
}
