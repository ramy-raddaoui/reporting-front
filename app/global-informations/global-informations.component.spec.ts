import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalInformationsComponent } from './global-informations.component';

describe('GlobalInformationsComponent', () => {
  let component: GlobalInformationsComponent;
  let fixture: ComponentFixture<GlobalInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
