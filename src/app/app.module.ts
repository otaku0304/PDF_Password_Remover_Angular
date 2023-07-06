import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RemovaalPasswordComponent } from './removaal-password/removaal-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RemovaalPasswordComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
