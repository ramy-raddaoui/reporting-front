import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropHorizBarComponent } from './drag-and-drop-horiz-bar.component';

describe('DragAndDropHorizBarComponent', () => {
  let component: DragAndDropHorizBarComponent;
  let fixture: ComponentFixture<DragAndDropHorizBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAndDropHorizBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropHorizBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
