import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBComponent } from './create-b.component';

describe('CreateBComponent', () => {
  let component: CreateBComponent;
  let fixture: ComponentFixture<CreateBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBComponent]
    });
    fixture = TestBed.createComponent(CreateBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
