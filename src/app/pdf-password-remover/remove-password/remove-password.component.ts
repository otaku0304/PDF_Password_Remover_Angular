import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PdfService } from 'src/app/core/service/pdf/pdf.service';
import { PdfBackendService } from 'src/app/core/service/pdf_backend_service/pdfBackend.service';
@Component({
    selector: 'app-remove-password',
    templateUrl: './remove-password.component.html',
    styleUrls: ['./remove-password.component.scss'],
    standalone: false
})
export class RemovePasswordComponent {
  @Output() unlockSuccess = new EventEmitter<string>();
  password: string = '';
  error: string = '';
  isHidePassword = false;
  pdfFile: any;
  constructor(
    public pdfBackendService: PdfBackendService,
    private pdfService: PdfService,
    private router: Router
  ) {}

  toggleShowPassword() {
    this.isHidePassword = !this.isHidePassword;
  }

  unlockPDF() {
    this.pdfFile = this.pdfService.getSelectedPdfFile();
    this.pdfBackendService.unlockPdf(this.password, this.pdfFile).subscribe(
      (response: Blob) => {
        this.router.navigate(['/pdf/download']);
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'unlocked.pdf';
        a.click();
        this.unlockSuccess.emit('PDF unlocked successfully');
      },
      (error) => {
        if (error.status === 400) {
          this.error = 'Incorrect password. Please check and try again.';
        } else if (error.status === 500) {
          this.error =
            'An error occurred on the server while unlocking the PDF.';
        } else {
          this.error = 'An error occurred while unlocking the PDF.';
        }
      }
    );
  }
}
