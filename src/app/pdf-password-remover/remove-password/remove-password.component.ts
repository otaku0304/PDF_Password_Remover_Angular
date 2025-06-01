import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PdfService } from '../../core/service/pdf/pdf.service';
import { PdfBackendService } from '../../core/service/pdf_backend_service/pdfBackend.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-remove-password',
  templateUrl: './remove-password.component.html',
  styleUrls: ['./remove-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class RemovePasswordComponent {
  @Output() unlockSuccess = new EventEmitter<string>();
  selectedFiles: File[] = this.pdfService.getSelectedPdfFile();
  passwords: string[] = [];
  currentFileIndex: number = 0;
  isHidePassword: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  constructor(
    public pdfBackendService: PdfBackendService,
    private readonly pdfService: PdfService,
    private readonly router: Router
  ) {}

  toggleShowPassword() {
    this.isHidePassword = !this.isHidePassword;
  }

  unlockPDF() {
    this.isLoading = true;
  
    const currentFile = this.selectedFiles[this.currentFileIndex];
    const currentPassword = this.passwords[this.currentFileIndex];
  
    this.pdfBackendService.unlockPdf(currentPassword, currentFile).subscribe(
      (response: Blob) => {
        this.isLoading = false;
  
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `unlocked-${this.currentFileIndex + 1}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.currentFileIndex++;
        if (this.currentFileIndex < this.selectedFiles.length) {
        } else {
          this.router.navigate(['/pdf/download']);
          this.unlockSuccess.emit('All PDFs unlocked successfully');
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error unlocking PDF:', error);
        if (error.status === 400) {
          this.error = 'Incorrect password. Please check and try again.';
        } else if (error.status === 500) {
          this.error = 'An error occurred on the server while unlocking the PDF.';
        } else if (error.message.includes('Http failure response')) {
          this.error = 'The server is not running. Please try again later.';
        } else {
          this.error = 'An error occurred while unlocking the PDF.';
        }
      }
    );
  }
  
  
}
