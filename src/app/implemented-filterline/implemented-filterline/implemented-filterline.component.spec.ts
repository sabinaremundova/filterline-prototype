import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImplementedFilterlineComponent} from './implemented-filterline.component';

describe('ImplementedFilterlineComponent', () => {
  let component: ImplementedFilterlineComponent;
  let fixture: ComponentFixture<ImplementedFilterlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImplementedFilterlineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementedFilterlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
