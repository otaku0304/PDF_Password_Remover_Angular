import { RouterModule, Routes } from '@angular/router';
import { SelectImageComponent } from './select-image/select-image.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'select-image',
    component: SelectImageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageRoutingModule {}
