import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFunctionComponent } from './group-function.component';

describe('GroupFunctionComponent', () => {
  let component: GroupFunctionComponent;
  let fixture: ComponentFixture<GroupFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
