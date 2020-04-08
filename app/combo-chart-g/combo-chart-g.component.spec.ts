import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboChartGComponent } from './combo-chart-g.component';

describe('ComboChartGComponent', () => {
  let component: ComboChartGComponent;
  let fixture: ComponentFixture<ComboChartGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboChartGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboChartGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
