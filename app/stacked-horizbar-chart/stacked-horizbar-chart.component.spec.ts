import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedHorizbarChartComponent } from './stacked-horizbar-chart.component';

describe('StackedHorizbarChartComponent', () => {
  let component: StackedHorizbarChartComponent;
  let fixture: ComponentFixture<StackedHorizbarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedHorizbarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedHorizbarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
