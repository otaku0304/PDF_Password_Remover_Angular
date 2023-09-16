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
  },
  {
    path: 'remove-password',
    component: RemovePasswordComponent,
    canActivate: [RemovePasswordGuard],
  },
  {
    path:'download',
    component:DownloadComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PDFRoutingModule {}
