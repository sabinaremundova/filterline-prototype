import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Bracket, BracketType, FilterPart, LogicalOperator, LogicalOperatorType, SimpleFilter} from '../shared/filters.model';
import {BRACKETS, BRACKETS_AND_OPERATORS, FILTER_OPERATORS, LOGICAL_OPERATORS} from '../shared/values';
import {FilterOperatorType} from '../shared/types.model';
import {Column} from '../shared/column.model';

export type InputMode = 'ADD' | 'EDIT';

export enum InputState {
  ALL,
  SIMPLE_FILTER,
  OTHER
}


@Component({
  selector: 'app-filterline-input',
  templateUrl: './filterline-input.component.html',
  styleUrls: ['./filterline-input.component.scss']
})
export class FilterlineInputComponent implements OnInit {

  @Input()
  filterPart: FilterPart;

  @Input()
  columns: Column[];

  @Output()
  updatePart = new EventEmitter<FilterPart>();

  @Output()
  addNewPart = new EventEmitter<FilterPart>();

  private mode: InputMode;
  private state: InputState;

  public autocompleteData: string[] = [];
  public filterOperators = FILTER_OPERATORS;

  public currentInput: string;
  private stack: FilterPart;


  public constructor() {
  }

  public ngOnInit() {
    this.checkInput();
  }


  public get isSimpleFilter(): boolean {
    return this.stack && this.stack instanceof SimpleFilter;
  }


  onValueChange() {

    switch (this.state) {

      case InputState.ALL:
        const column: Column = this.parseColumnObjectFromInput();
        if (!column) {
          this.parseOtherFromInput();
          if (this.stack) {
            this.emitResult();
          }
          break;
        }
        this.stack = new SimpleFilter();
        this.stack.column = column;
        this.state = InputState.SIMPLE_FILTER;
        break;

      case InputState.SIMPLE_FILTER:
        if (this.stack instanceof SimpleFilter) {
          if (this.stack.column && this.stack.operator && this.stack.value) {
            this.emitResult();
          }
        }
        break;

      case InputState.OTHER:
        this.parseOtherFromInput();
        if (this.stack) {
          this.emitResult();
        }
        break;
    }
  }


  /*private onValueChange(newValue: string) {
    switch (this.state) {
      case InputState.ALL:
        const column: Column = this.parseColumnObjectFromInput();
        console.log(column);
        if (column !== undefined) {
          this.stack = new SimpleFilter();
          this.stack.column = column;
          this.fillAutocompleteFilterOperators();
          this.inputAddSpace();
          break;
        }

        this.parseOtherFromInput();
        this.emitResult();

        this.inputClear();
        this.fillAutocompleteAll();
        break;

      case InputState.FILTER_OPERATOR:
        if (this.autocompleteData.includes(this.currentInput)) {
          (this.stack as SimpleFilter).operator = this.currentInput.split(' ')[1] as FilterOperatorType;
          this.fillAutocompleteValue();
          this.inputAddSpace();
        } else {
          this.inputClear();
          this.fillAutocompleteAll();
        }
        break;

      case InputState.VALUE:
        (this.stack as SimpleFilter).value = this.currentInput.split(' ')[2];
        if (this.mode === 'ADD') {
          this.addNewPart.emit(this.stack);
        } else {
          this.updatePart.emit(this.stack);
        }
        this.inputClear();
        this.fillAutocompleteAll();
        break;

      case InputState.OTHER:
        this.parseOtherFromInput();
        this.emitResult();
        this.inputClear();
        this.fillAutocompleteAll();
        break;
    }

  }*/

  private parseColumnObjectFromInput(): Column | undefined {
    return this.columns.find((c: Column) => c.name === this.currentInput);
  }

  private checkInput() {
    if (this.filterPart === 'EMPTY') {
      this.mode = 'ADD';
      this.fillAutocompleteAll();
      this.inputClear();
      return;
    }
    this.mode = 'EDIT';
    if (this.filterPart instanceof Bracket) {
      this.currentInput = this.filterPart.toString();
      this.fillAutocompleteAll();
    } else if (this.filterPart instanceof LogicalOperator) {
      this.currentInput = this.filterPart.toString();
      this.fillAutocompleteAll();
    } else if (this.filterPart instanceof SimpleFilter) {
      this.currentInput = this.filterPart.column.name;
      this.stack = new SimpleFilter();
      this.stack.operator = this.filterPart.operator;
      this.stack.value = this.filterPart.value;
      this.fillAutocompleteAll();
    }
  }

  getColumnType(option: any): string {
    return 'NUM';
  }


  private fillAutocompleteOther(): void {
    this.state = InputState.OTHER;
    this.autocompleteData = BRACKETS_AND_OPERATORS;
  }

  private fillAutocompleteAll(): void {
    this.state = InputState.ALL;
    this.autocompleteData = BRACKETS_AND_OPERATORS.concat(this.columns.map((c: Column) => c.name));
  }

  private inputClear(): void {
    this.currentInput = '';
    this.stack = null;
  }

  private inputAddSpace(): void {
    this.currentInput += ' ';
  }

  private parseOtherFromInput() {
    if (BRACKETS.includes(this.currentInput)) {
      this.stack = new Bracket(this.currentInput as BracketType);
    } else if (LOGICAL_OPERATORS.includes(this.currentInput)) {
      this.stack = new LogicalOperator(this.currentInput as LogicalOperatorType);
    }
  }

  private emitResult() {
    if (this.mode === 'ADD') {
      this.addNewPart.emit(this.stack);
    } else {
      this.updatePart.emit(this.stack);
    }
  }
}
