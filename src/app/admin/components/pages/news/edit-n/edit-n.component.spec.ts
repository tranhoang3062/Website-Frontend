import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNComponent } from './edit-n.component';

describe('EditNComponent', () => {
  let component: EditNComponent;
  let fixture: ComponentFixture<EditNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNComponent]
    });
    fixture = TestBed.createComponent(EditNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
