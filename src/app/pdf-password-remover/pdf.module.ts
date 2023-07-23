import { NgModule } from '@angular/core';
import { SelectPdfFilesComponent } from './select-pdf-files/select-pdf-files.component';
import { PDFRoutingModule } from './pdf-routing.module';
import { CommonModule } from '@angular/common';
import { RemovePasswordComponent } from './remove-password/remove-password.component';
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [SelectPdfFilesComponent, RemovePasswordComponent],
  exports: [],
  providers: [],
  imports: [CommonModule, PDFRoutingModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule],
})
export class PDFModule {}
