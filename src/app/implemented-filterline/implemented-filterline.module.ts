import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImplementedFilterlineComponent} from './implemented-filterline/implemented-filterline.component';
import {FormsModule} from '@angular/forms';
import {AutocompleteInputComponent} from './autocomplete-input/autocomplete-input.component';


@NgModule({
    declarations: [ImplementedFilterlineComponent, AutocompleteInputComponent],
    exports: [ImplementedFilterlineComponent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ImplementedFilterlineModule {
}
