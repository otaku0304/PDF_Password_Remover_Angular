import { NgModule } from "@angular/core";
import { SelectImageComponent } from "./select-image/select-image.component";
import { ImageRoutingModule } from "./image-routing.module";

@NgModule({
    declarations: [SelectImageComponent],
    exports: [],
    providers: [],
    imports: [ImageRoutingModule],
})
export class ImageModule{}