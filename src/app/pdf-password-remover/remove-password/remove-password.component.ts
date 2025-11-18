import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TokenService } from '../../core/token.service';
import { PdfBackendService } from 'src/app/core/service/pdf_backend_service/pdfBackend.service';

@Component({
  selector: 'app-remove-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './remove-password.component.html',
  styleUrls: ['./remove-password.component.scss'],
})
export class RemovePasswordComponent {
  loading = false;
  status = '';
  password = '';
  showPassword = false;
  downloadHref: string | null = null;

  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly tokenService: TokenService,
    private readonly pdfApi: PdfBackendService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(fileInput: HTMLInputElement) {
    if (!this.isBrowser) return;

    const file = fileInput.files?.[0] || null;
    const pwd = (this.password || '').trim();
    this.downloadHref = null;
    this.status = '';

    if (!file || !pwd) {
      this.status = 'Please choose a PDF and enter password.';
      return;
    }
    if (
      file.type !== 'application/pdf' &&
      !file.name.toLowerCase().endsWith('.pdf')
    ) {
      this.status = 'Only PDF files are supported.';
      return;
    }

    this.loading = true;
    this.status = 'Processing…';
    this.attempt(file, pwd, false);
  }

  private attempt(file: File, pwd: string, isRetry: boolean) {
    this.tokenService.getReqToken().subscribe({
      next: ({ req_token }) => {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('password', pwd);

        this.pdfApi.removePassword(fd, req_token).subscribe({
          next: (blob: Blob) => {
            this.loading = false;
            if (!(blob instanceof Blob)) {
              this.status = 'Unexpected response.';
              return;
            }
            this.downloadHref = URL.createObjectURL(blob);
            this.status = 'Done! Click to download.';
          },
          error: (err) => {
            this.handleError(err).then((reason) => {
              if (
                !isRetry &&
                ['bad_token', 'expired', 'replayed', 'ip_mismatch'].includes(
                  reason
                )
              ) {
                this.attempt(file, pwd, true);
                return;
              }
              this.loading = false;
              this.status = reason || 'Server error. Please try again.';
            });
          },
        });
      },
      error: () => {
        this.loading = false;
        this.status = 'Could not prepare request.';
      },
    });
  }


  private async handleError(err: any): Promise<string> {
    try {
      const hdr = err?.headers?.get?.('X-Error-Reason');
      if (hdr) return hdr;

      const payload = err?.error;
      if (payload instanceof Blob) {
        const ct = payload.type || '';
        if (ct.includes('application/json')) {
          const obj = await new Response(payload)
            .json()
            .catch(() => ({} as any));
          return obj && typeof obj.error === 'string'
            ? obj.error
            : 'Unexpected error';
        }
        const text = await new Response(payload).text().catch(() => '');
        if (text) return text.slice(0, 200);
        return 'Unexpected error';
      }

      if (
        payload &&
        typeof payload === 'object' &&
        typeof payload.error === 'string'
      ) {
        return payload.error;
      }

      return (err?.message || '').slice(0, 200) || 'Network error';
    } catch {
      return 'Unexpected error';
    }
  }
}
