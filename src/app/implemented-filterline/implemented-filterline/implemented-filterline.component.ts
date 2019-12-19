import {Component, OnInit} from '@angular/core';
import {FilterNode, FilterPart, SimpleFilter} from '../shared/filters.model';
import {columnSamples} from '../shared/mock.data';
import {FilterOperatorType} from '../shared/types.model';
import {FILTER_OPERATORS} from '../shared/values';
import {Column} from '../shared/column.model';


@Component({
  selector: 'app-implemented-filterline',
  templateUrl: './implemented-filterline.component.html',
  styleUrls: ['./implemented-filterline.component.scss']
})
export class ImplementedFilterlineComponent implements OnInit {

  public filters: FilterPart[] = [];
  public columns: Column[] = columnSamples;

  private filterInEdition: number;
  private deactivatedFilters: number[] = [];

  constructor() {
  }

  ngOnInit() {
    // init
  }

  isInEditing(index: number): boolean {
    return this.filterInEdition === index;
  }

  startEdit(index: number): void {
    if (this.isInEditing(index)) {
      return;
    }
    this.filterInEdition = index;
  }

  isActive(index: number): boolean {
    return !this.deactivatedFilters.includes(index);
  }

  toggleIsActive(index: number): void {
    if (this.isActive(index)) {
      this.deactivatedFilters.push(index);
      return;
    }
    this.deactivatedFilters.splice(index, 1);
  }

  onChange(): void {
  }


  addNewPart(item: FilterPart): void {
    this.filters.push(item);
  }

  updatePart(item: FilterPart): void {
    this.filters[this.filterInEdition] = item;
    this.filterInEdition = null;
  }
}
