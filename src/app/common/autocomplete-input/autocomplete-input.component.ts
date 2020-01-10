import {Component, HostListener, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent<T> implements OnInit {

  @Input()
  allOptions: T[];

  @Input()
  optionTemplateGetter: (option: T) => TemplateRef<any>;

  @Input()
  filterBy: (option: T, value: string) => boolean;

  @Output()
  valueChange = new EventEmitter();


  filteredOptions: T[];

  inputValue: string;

  selectedOption: number;

  activeOption: number;

  showDropdown: boolean;


  @HostListener('document:keydown', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    console.log(event);
    switch (event.key) {
      case 'ArrowUp':
        this.setActivePreviousOption();
        break;
      case 'ArrowDown':
        this.setActiveNextOption();
        break;
      case 'Enter':
        this.selectOption(this.activeOption);
        break;
      default:
        break;
    }
  }


  constructor() {
  }

  ngOnInit() {
    this.reset();
    this.showDropdown = true;
  }

  reset() {
    this.filteredOptions = this.allOptions;
    this.inputValue = null;
    this.activeOption = -1;
    this.selectedOption = -1;
  }

  onOptionClick() {

  }

  get isDropdownVisible() {
    return this.showDropdown && this.filteredOptions.length;
  }

  selectOption(index: number) {
    if (this.isInvalidIndex(index)) {
      return;
    }
    this.selectedOption = index;
    this.reset();
  }

  setActiveOption(index: number) {
    if (this.isInvalidIndex(index)) {
      return;
    }
    this.activeOption = index;
  }

  setActiveNextOption() {
    if (this.isInvalidIndex(this.activeOption + 1)) {
      return;
    }
    this.activeOption++;
  }

  setActivePreviousOption() {
    if (this.isInvalidIndex(this.activeOption - 1)) {
      return;
    }
    this.activeOption--;
  }


  onInputChange() {
    this.filteredOptions = this.allOptions.filter((option: T) => this.filterBy(option, this.inputValue));
  }

  private isInvalidIndex(index: number): boolean {
    return index < 0 || index >= this.filteredOptions.length;
  }

  onInputFocus() {
    this.showDropdown = true;
  }

  onInputBlur() {
    this.activeOption = -1;
  }

  onInputDoubleClick() {
    this.showDropdown = true;
  }
}
