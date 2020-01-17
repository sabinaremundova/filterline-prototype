import {Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {

  @Input()
  allOptions: string[] = [];

  @Input()
  optionTemplate: TemplateRef<any>;

  @Input()
  value: string;

  @Output()
  valueChange = new EventEmitter<string>();


  filteredOptions: string[] = [];

  selectedOption: number;

  activeOption: number;

  showDropdown: boolean;


  constructor() {
  }

  ngOnInit() {
    this.reset();
    document.getElementById('input').focus();
    this.showDropdown = true;
  }

  reset() {
    this.filteredOptions = this.allOptions;
    this.value = null;
    this.activeOption = -1;
    this.selectedOption = -1;
  }


  filterBy(option: string, input: string): boolean {
    if (!input) {
      return true;
    }
    console.log(option.toLowerCase().includes(input.toLowerCase()));
    return option.toLowerCase().includes(input.toLowerCase());
  }

  get isDropdownVisible() {
    return this.showDropdown && this.filteredOptions && this.filteredOptions.length;
  }

  onEnter() {
    if (this.activeOption === -1 && this.value) {
      this.valueChange.emit(this.value);
      return;
    }
    if (this.activeOption !== -1) {
      this.selectOption(this.activeOption);
    }
  }

  selectOption(index: number) {
    console.log(index);
    if (this.isInvalidIndex(index)) {
      return;
    }
    this.selectedOption = index;
    this.valueChange.emit(this.allOptions[this.selectedOption]);
  }

  setActiveOption(index: number) {
    if (this.isInvalidIndex(index)) {
      return;
    }
    this.activeOption = index;
    console.log(this.activeOption);
  }

  setActiveNextOption() {
    this.setActiveOption(this.activeOption + 1);
  }

  setActivePreviousOption() {
    this.setActiveOption(this.activeOption - 1);
  }


  onInputChange() {
    console.log(this.value);
    const filteredOptions = this.allOptions.filter((option: string) => this.filterBy(option, this.value));
    if (this.activeOption !== -1) {
      this.activeOption = filteredOptions.findIndex((option: string) => option === this.filteredOptions[this.activeOption]);
    }
    this.filteredOptions = filteredOptions;
  }

  private isInvalidIndex(index: number): boolean {
    return index < -1 || index >= this.filteredOptions.length;
  }

  onInputFocus() {
    this.showDropdown = true;
  }

  onInputBlur() {
    this.activeOption = -1;
    this.showDropdown = false;
  }

  onInputDoubleClick() {
    this.showDropdown = true;
  }
}
