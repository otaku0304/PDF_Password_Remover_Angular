import { NgModule } from '@angular/core';
import { SelectPdfFilesComponent } from './select-pdf-files/select-pdf-files.component';
import { PDFRoutingModule } from './pdf-routing.module';
@NgModule({
    declarations: [
        SelectPdfFilesComponent
    ], 
    exports: [],
    providers: [],
    imports: [PDFRoutingModule]
})
export class PDFModule{}