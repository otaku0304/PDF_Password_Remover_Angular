import { RouterModule, Routes } from "@angular/router";
import { SelectPdfFilesComponent } from "./select-pdf-files/select-pdf-files.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    {
        path: 'select-pdf-files',
        component: SelectPdfFilesComponent

    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PDFRoutingModule { }