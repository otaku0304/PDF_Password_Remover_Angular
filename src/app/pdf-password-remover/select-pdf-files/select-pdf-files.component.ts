import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/service/snackbar/snackbar.service';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-select-pdf-files',
  templateUrl: './select-pdf-files.component.html',
  styleUrls: ['./select-pdf-files.component.scss']
})
export class SelectPdfFilesComponent {
  selectedFileNames: string[] = [];
  selectedFiles: File[] = [];
  passwordProtectionStatus: boolean[] = [];

  constructor(private snackBarService: SnackbarService, private router: Router) { }

  openFileExplorer() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.multiple = true;
    fileInput.onchange = (event) => {
      this.onFilesSelected(event);
    };
    fileInput.click();
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }

  async checkPdfPassword(file: File): Promise<boolean> {
    try {
      const fileReader = new FileReader();
      const fileArrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
        fileReader.onerror = () => reject(fileReader.error);
        fileReader.readAsArrayBuffer(file);
      });

      const pdfDocument = await PDFDocument.load(fileArrayBuffer);
      return pdfDocument.isEncrypted;
    } catch (error) {
      console.error('Error loading PDF:', error);
      return false; 
    }
  }

  async onFilesSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const selectedFiles = fileInput.files;

    if (selectedFiles) {
      const allowedFileCount = 5;
      for (const file of Array.from(selectedFiles)) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === 'pdf') {
          if (this.selectedFileNames.length < allowedFileCount) {
            this.selectedFiles.push(file);
            this.selectedFileNames.push(file.name);
          } else {
            this.snackBarService.openSnackBar('You can select a maximum of 5 PDF files.', 'Ok');
            break;
          }
        } else {
          this.snackBarService.openSnackBar('Please select a valid PDF file.', 'Ok');
        }
      }
    }
    await this.checkSelectedFilesPassword();
  }

  async checkSelectedFilesPassword() {
    this.passwordProtectionStatus = [];
    for (const file of this.selectedFiles) {
      const isPasswordProtected = await this.checkPdfPassword(file);
      this.passwordProtectionStatus.push(isPasswordProtected);
    }
  }

  removeSelectedFile(fileName: string): void {
    const index = this.selectedFileNames.indexOf(fileName);
    if (index !== -1) {
      this.selectedFileNames.splice(index, 1);
      this.selectedFiles.splice(index, 1);
      this.passwordProtectionStatus.splice(index, 1);
    }
  }

  async removePassword() {
    this.passwordProtectionStatus = [];
    await this.checkSelectedFilesPassword();

    const passwordProtectedFiles = this.selectedFileNames.filter(
      (_, index) => this.passwordProtectionStatus[index]
    );

    if (passwordProtectedFiles.length > 0) {
      this.router.navigate(['/pdf/remove-password']);
    } else {
      this.snackBarService.openSnackBar('Selected PDFs are not password-protected.', 'Ok');
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    const allowedFileCount = 5;
    if (files) {
      for (const file of Array.from(files)) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === 'pdf') {
          if (this.selectedFileNames.length < allowedFileCount) {
            this.selectedFiles.push(file);
            this.selectedFileNames.push(file.name);
          } else {
            this.snackBarService.openSnackBar('You can select a maximum of 5 PDF files.', 'Ok');
            break;
          }
        } else {
          this.snackBarService.openSnackBar('Please select a valid PDF file.', 'Ok');
        }
      }
    }
    this.checkSelectedFilesPassword();
  }
}
