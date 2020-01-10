import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImplementedFilterlineComponent} from './implemented-filterline/implemented-filterline.component';
import {FormsModule} from '@angular/forms';
import {FilterlineInputComponent} from './filterline-input/filterline-input.component';
import {AutocompleteInputComponent} from '../common';


@NgModule({
  declarations: [ImplementedFilterlineComponent, FilterlineInputComponent],
  exports: [ImplementedFilterlineComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ImplementedFilterlineModule {
}
