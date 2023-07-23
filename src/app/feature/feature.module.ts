import { NgModule } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { FeatureRoutingModule } from './feature-routing.module';

@NgModule({
  declarations: [LandingComponent],
  exports: [],
  providers: [],
  imports: [FeatureRoutingModule],
})
export class FeatureModule {}
