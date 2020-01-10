import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterlineInputComponent} from './filterline-input.component';

describe('FilterlineInputComponent', () => {
  let component: FilterlineInputComponent;
  let fixture: ComponentFixture<FilterlineInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterlineInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterlineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
