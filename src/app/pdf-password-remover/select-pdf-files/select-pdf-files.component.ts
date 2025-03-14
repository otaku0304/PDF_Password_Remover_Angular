import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from './../../core/service/snackbar/snackbar.service';
import { PdfService } from 'src/app/core/service/pdf/pdf.service';

@Component({
    selector: 'app-select-pdf-files',
    templateUrl: './select-pdf-files.component.html',
    styleUrls: ['./select-pdf-files.component.scss'],
    standalone: false
})
export class SelectPdfFilesComponent {
  selectedFiles: File[] = [];

  constructor(
    private snackBarService: SnackbarService,
    private router: Router,
    private pdfService: PdfService
  ) {}

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

  onFilesSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const selectedFiles = fileInput.files;
    const allowedFileCount = 5;
    if (selectedFiles) {
      for (const file of Array.from(selectedFiles)) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === 'pdf') {
          if (this.selectedFiles.length < allowedFileCount) {
            this.selectedFiles.push(file);
          } else {
            this.snackBarService.openSnackBar(
              'You can select a maximum of 5 PDF files.',
              'Ok'
            );
            break;
          }
        } else {
          this.snackBarService.openSnackBar(
            'Please select a valid PDF file.',
            'Ok'
          );
        }
      }
    }
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    const allowedFileCount = 5;
    if (files) {
      for (const file of Array.from(files)) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === 'pdf') {
          if (this.selectedFiles.length < allowedFileCount) {
            this.selectedFiles.push(file);
          } else {
            this.snackBarService.openSnackBar(
              'You can select a maximum of 5 PDF files.',
              'Ok'
            );
            break;
          }
        } else {
          this.snackBarService.openSnackBar(
            'Please select a valid PDF file.',
            'Ok'
          );
        }
      }
    }
  }

  removeSelectedFile(file: File): void {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  async submitFiles() {
    const unencryptedFileNames: string[] = [];
    for (const file of this.selectedFiles) {
      const encrypted = await this.checkEncryptionStatus(file);
      if (encrypted) {
      } else {
        unencryptedFileNames.push(file.name);
      }
    }
    if (unencryptedFileNames.length > 0) {
      const unencryptedFileNamesString = unencryptedFileNames.join(', ');
      this.snackBarService.openSnackBar(
        `${unencryptedFileNamesString} has no password`,
        'Ok'
      );
    } else {
      this.pdfService.setSelectedPdfFile(this.selectedFiles[0]);
      this.pdfService.setEncryptionStatus(true);
      this.router.navigate(['/pdf/remove-password']);
    }
  }

  async checkEncryptionStatus(file: File): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content?.indexOf('/Encrypt') !== -1) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  }
}
