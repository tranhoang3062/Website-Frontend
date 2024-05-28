import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePComponent } from './create-p.component';

describe('CreatePComponent', () => {
  let component: CreatePComponent;
  let fixture: ComponentFixture<CreatePComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePComponent]
    });
    fixture = TestBed.createComponent(CreatePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
