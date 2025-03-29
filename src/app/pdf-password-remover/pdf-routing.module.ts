import { RouterModule, Routes } from '@angular/router';
import { SelectPdfFilesComponent } from './select-pdf-files/select-pdf-files.component';
import { NgModule } from '@angular/core';
import { RemovePasswordComponent } from './remove-password/remove-password.component';
import { RemovePasswordGuard } from '../core/guard/remove-password-guard/removePasswordGuard';
import { DownloadComponent } from './download/download.component';

export const routes: Routes = [
  {
    path: 'select-pdf-files',
    component: SelectPdfFilesComponent,
    data: {
      title: 'Select PDF Files',
      description: 'Upload and select PDF files to remove passwords.',
    },
  },
  {
    path: 'remove-password',
    component: RemovePasswordComponent,
    canActivate: [RemovePasswordGuard],
    data: {
      title: 'Remove Password',
      description: 'Securely remove passwords from your PDF files.',
    },
  },
  {
    path: 'download',
    component: DownloadComponent,
    data: {
      title: 'Download PDF',
      description: 'Download your processed PDF file.',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PDFRoutingModule {}
