import { Component } from '@angular/core';
import { PDFDocument } from 'pdf-lib';


@Component({
  selector: 'app-removaal-password',
  templateUrl: './removaal-password.component.html',
  styleUrls: ['./removaal-password.component.scss']
})
export class RemovaalPasswordComponent {
  async removePasswordFromPDF(file: File) {
    try {
      // Load the PDF file
      const pdfBytes = await this.readFileAsArrayBuffer(file);
      const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

      // Remove the password encryption
      pdfDoc.setEncryption('', '');

      // Save the modified PDF as a new file
      const modifiedPdfBytes = await pdfDoc.save();
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      saveAs(modifiedPdfBlob, 'unlocked_pdf.pdf');
    } catch (error) {
      console.error('Error removing password:', error);
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
