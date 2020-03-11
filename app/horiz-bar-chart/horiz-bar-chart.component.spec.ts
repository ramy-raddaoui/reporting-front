import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizBarChartComponent } from './horiz-bar-chart.component';

describe('HorizBarChartComponent', () => {
  let component: HorizBarChartComponent;
  let fixture: ComponentFixture<HorizBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
