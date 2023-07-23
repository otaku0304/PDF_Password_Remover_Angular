import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeatureRoutingModule } from "./feature/feature-routing.module";
const routes: Routes = [
    {
        path:'',
        loadChildren: () =>
        import('./pdf-password-remover/pdf.module').then((m) => m.PDFModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./feature/feature.module').then((m) => m.FeatureModule),
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes), FeatureRoutingModule],
    exports: [RouterModule],
})
export class AppRoutingModule{}