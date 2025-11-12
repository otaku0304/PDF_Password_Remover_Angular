import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  loading = false;
  status = '';
  downloadHref: string | null = null;

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async onSubmit(
    fileInput: HTMLInputElement,
    pwdInput: HTMLInputElement
  ): Promise<void> {
    if (!this.isBrowser) return;

    const file = fileInput.files?.[0] || null;
    const password = (pwdInput.value || '').trim();

    this.downloadHref = null;
    this.status = '';

    if (!file || !password) {
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

    const fd = new FormData();
    fd.append('file', file);
    fd.append('password', password);

    this.loading = true;
    this.status = 'Processing…';

    try {
      const res = await this.fetchWithRetry('/api/remove_password', {
        method: 'POST',
        body: fd,
      });
      const blob = await res.blob();

      if (blob?.type?.includes('pdf')) {
        const url = URL.createObjectURL(blob);
        this.downloadHref = url;
        this.status = 'Done! Click to download.';
      } else {
        const text = await blob.text().catch(() => '');
        throw new Error(text || 'Unexpected response from server.');
      }
    } catch (err: any) {
      this.status = err?.message || 'Server error. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private async fetchWithRetry(
    path: string,
    opts: RequestInit = {},
    tries = 3,
    ms = 800
  ): Promise<Response> {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), 10_000);
    try {
      const res = await fetch(path, { ...opts, signal: ctrl.signal });
      clearTimeout(id);

      if (!res.ok) {
        const ct = res.headers.get('content-type') || '';
        const body = ct.includes('application/json')
          ? await res.json().catch(() => ({}))
          : await res.text().catch(() => '');
        const msg =
          typeof body === 'string' ? body : body.error || `HTTP ${res.status}`;
        throw new Error(msg);
      }
      return res;
    } catch (e) {
      clearTimeout(id);
      if (tries > 1) {
        await new Promise((r) => setTimeout(r, ms));
        return this.fetchWithRetry(path, opts, tries - 1, ms * 1.5);
      }
      throw e;
    }
  }
}
