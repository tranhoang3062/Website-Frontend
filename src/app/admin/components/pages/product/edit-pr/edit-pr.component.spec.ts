import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrComponent } from './edit-pr.component';

describe('EditPrComponent', () => {
  let component: EditPrComponent;
  let fixture: ComponentFixture<EditPrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPrComponent]
    });
    fixture = TestBed.createComponent(EditPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
