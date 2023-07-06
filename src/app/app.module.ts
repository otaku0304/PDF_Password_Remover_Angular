import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PdfPasswordRemoverComponent } from './pdf-password-remover/pdf-password-remover.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfPasswordRemoverComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
