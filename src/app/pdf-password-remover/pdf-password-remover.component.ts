import { Component } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-pdf-password-remover',
  templateUrl: './pdf-password-remover.component.html',
  styleUrls: ['./pdf-password-remover.component.scss']
})
export class PdfPasswordRemoverComponent {
  selectedFile: any;
  errorMessage: string | null = null;
  passwordRemoved = false;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.errorMessage = null;
  }

  async removePassword() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a PDF file.';
      return;
    }

    try {
      const fileBuffer = await this.readFileAsArrayBuffer(this.selectedFile);
      const pdfDoc = await PDFDocument.load(fileBuffer);

      // Create a new PDF document without encryption
      const newPdfDoc = await PDFDocument.create();

      // Copy all pages from the original document to the new document
      const pages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => newPdfDoc.addPage(page));

      // Save the modified PDF as a new file
      const modifiedPdfBytes = await newPdfDoc.save();
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(modifiedPdfBlob);
      downloadLink.download = 'unlocked_pdf.pdf';
      downloadLink.click();

      this.passwordRemoved = true; // Set passwordRemoved to true upon successful removal
    } catch (error) {
      console.error('Error removing password:', error);
      this.errorMessage = 'An error occurred while removing the password.';
    }
  }

  private readFileAsArrayBuffer(file: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
}
