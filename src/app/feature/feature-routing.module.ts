import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'Home',
      description: 'Welcome to the home page our application.',
    },
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
