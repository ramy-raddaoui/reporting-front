import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOfChartsComponent } from './menu-of-charts.component';

describe('MenuOfChartsComponent', () => {
  let component: MenuOfChartsComponent;
  let fixture: ComponentFixture<MenuOfChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOfChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOfChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
