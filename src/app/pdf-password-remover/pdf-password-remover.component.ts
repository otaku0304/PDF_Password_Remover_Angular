import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-pdf-password-remover',
  templateUrl: './pdf-password-remover.component.html',
  styleUrls: ['./pdf-password-remover.component.scss'],
})
export class PdfPasswordRemoverComponent {
  selectedFileNames: string[] = [];

  constructor(private snackBar: MatSnackBar) {}

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
          if (this.selectedFileNames.length < allowedFileCount) {
            this.selectedFileNames.push(file.name);
          } else {
            this.snackBar.open('You can select a maximum of 5 PDF files.');
            break;
          }
        } else {
          this.snackBar.open('Please select a valid PDF file.');
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
          if (this.selectedFileNames.length < allowedFileCount) {
            this.selectedFileNames.push(file.name);
          } else {
            this.snackBar.open('You can select a maximum of 5 PDF files.');
            break;
          }
        } else {
          this.snackBar.open('Please select a valid PDF file.');
        }
      }
    }
  }

  removeSelectedFile(fileName: string): void {
    const index = this.selectedFileNames.indexOf(fileName);
    if (index !== -1) {
      this.selectedFileNames.splice(index, 1);
    }
  }

  submitFiles() {
    // Handle the logic to submit the selected files here
    // For example, you can call an API to process the selected files
    this.snackBar.open('Submitting files...');
  }
}
