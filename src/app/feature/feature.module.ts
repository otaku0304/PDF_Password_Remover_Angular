import { NgModule } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [LandingComponent, PageNotFoundComponent],
  exports: [],
  providers: [],
  imports: [FeatureRoutingModule],
})
export class FeatureModule {}
