import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImplementedFilterlineComponent} from './implemented-filterline/implemented-filterline.component';
import {FormsModule} from '@angular/forms';
import {FilterlineInputComponent} from './filterline-input/filterline-input.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ImplementedFilterlineComponent, FilterlineInputComponent],
  exports: [ImplementedFilterlineComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class ImplementedFilterlineModule {
}
