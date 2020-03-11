import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedVBarChartComponent } from './stacked-vbar-chart.component';

describe('StackedVBarChartComponent', () => {
  let component: StackedVBarChartComponent;
  let fixture: ComponentFixture<StackedVBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedVBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedVBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
