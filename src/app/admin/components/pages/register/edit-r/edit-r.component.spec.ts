import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRComponent } from './edit-r.component';

describe('EditRComponent', () => {
  let component: EditRComponent;
  let fixture: ComponentFixture<EditRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRComponent]
    });
    fixture = TestBed.createComponent(EditRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
