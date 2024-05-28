import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBComponent } from './edit-b.component';

describe('EditBComponent', () => {
  let component: EditBComponent;
  let fixture: ComponentFixture<EditBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBComponent]
    });
    fixture = TestBed.createComponent(EditBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
