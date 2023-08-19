import { RouterModule, Routes } from '@angular/router';
import { ChangeLanguageComponent } from '../i18n/change-language/change-language.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'change-language',
    component: ChangeLanguageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class I18nRoutingModule {}
