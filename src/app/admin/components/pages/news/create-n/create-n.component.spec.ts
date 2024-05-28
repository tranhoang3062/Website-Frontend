import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNComponent } from './create-n.component';

describe('CreateNComponent', () => {
  let component: CreateNComponent;
  let fixture: ComponentFixture<CreateNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNComponent]
    });
    fixture = TestBed.createComponent(CreateNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
