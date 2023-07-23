import { NgModule } from '@angular/core';
import { SelectPdfFilesComponent } from './select-pdf-files/select-pdf-files.component';
import { PDFRoutingModule } from './pdf-routing.module';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [SelectPdfFilesComponent],
  exports: [],
  providers: [],
  imports: [CommonModule, PDFRoutingModule],
})
export class PDFModule {}
