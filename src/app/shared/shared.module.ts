import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteInputComponent} from './autocomplete-input/autocomplete-input.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [AutocompleteInputComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AutocompleteInputComponent
  ]
})
export class SharedModule {
}
