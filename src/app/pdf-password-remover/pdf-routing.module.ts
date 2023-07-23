import { RouterModule, Routes } from '@angular/router';
import { SelectPdfFilesComponent } from './select-pdf-files/select-pdf-files.component';
import { NgModule } from '@angular/core';
import { RemovePasswordComponent } from './remove-password/remove-password.component';

export const routes: Routes = [
  {
    path: 'select-pdf-files',
    component: SelectPdfFilesComponent,
  },
  {
    path: 'remove-password',
    component: RemovePasswordComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PDFRoutingModule {}
