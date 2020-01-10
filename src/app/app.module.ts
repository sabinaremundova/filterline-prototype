import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ImplementedFilterlineModule} from './implemented-filterline/implemented-filterline.module';
import {AutocompleteInputComponent} from './common';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ImplementedFilterlineModule
  ],
  providers: [],
  exports: [
    AutocompleteInputComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
