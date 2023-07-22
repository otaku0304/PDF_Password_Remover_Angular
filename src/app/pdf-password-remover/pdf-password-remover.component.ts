import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-password-remover',
  templateUrl: './pdf-password-remover.component.html',
  styleUrls: ['./pdf-password-remover.component.scss'],
})
export class PdfPasswordRemoverComponent {
  selectedFileNames: string[] = [];

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
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === 'pdf') {
          if (this.selectedFileNames.length < allowedFileCount) {
            this.selectedFileNames.push(file.name);
          } else {
            alert('You can select a maximum of 5 PDF files.');
            break;
          }
        } else {
          alert('Please select a valid PDF file.');
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
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === 'pdf') {
          if (this.selectedFileNames.length < allowedFileCount) {
            this.selectedFileNames.push(file.name);
          } else {
            alert('You can select a maximum of 5 PDF files.');
            break;
          }
        } else {
          alert('Please select a valid PDF file.');
        }
      }
    }
  }
}
