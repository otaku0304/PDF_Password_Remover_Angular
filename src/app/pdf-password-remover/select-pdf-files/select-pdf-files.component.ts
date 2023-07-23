import { Component } from '@angular/core';
import { SnackbarService } from 'src/app/core/service/snackbar/snackbar.service';

@Component({
  selector: 'app-select-pdf-files',
  templateUrl: './select-pdf-files.component.html',
  styleUrls: ['./select-pdf-files.component.scss']
})
export class SelectPdfFilesComponent {
  selectedFileNames: string[] = [];

  constructor(private snackBarService: SnackbarService,) { }

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
            this.snackBarService.openSnackBar('You can select a maximum of 5 PDF files.', 'Ok');
            break;
          }
        } else {
          this.snackBarService.openSnackBar('Please select a valid PDF file.', 'Ok');
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
            this.snackBarService.openSnackBar('You can select a maximum of 5 PDF files.', 'Ok');
            break;
          }
        } else {
          this.snackBarService.openSnackBar('Please select a valid PDF file.', 'Ok');
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
    this.snackBarService.openSnackBar('Submitting files...', 'Ok');
  }
}
