import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeatureRoutingModule } from "./feature/feature-routing.module";
const routes: Routes = [
    {
        path:'pdf',
        loadChildren: () =>
        import('./pdf-password-remover/pdf.module').then((m) => m.PDFModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./feature/feature.module').then((m) => m.FeatureModule),
    }, 
    {
        path: 'i18n',
        loadChildren: () =>
            import('./i18n/i18n.module').then((m) => m.I18nModule),
    },
    {
        path: 'image',
        loadChildren: () =>
            import('./image-compressor/image.module').then((m) => m.ImageModule),
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes), FeatureRoutingModule],
    exports: [RouterModule],
})
export class AppRoutingModule{}