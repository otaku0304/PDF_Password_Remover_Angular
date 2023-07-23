import { NgModule } from "@angular/core";
import { ChangeLanguageComponent } from "./change-language/change-language.component";
import { I18nRoutingModule } from "./i18n-routing.module";

@NgModule({
    declarations: [ChangeLanguageComponent],
    exports: [],
    providers: [],
    imports: [I18nRoutingModule],
})
export class I18nModule{}