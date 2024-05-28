import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCtComponent } from './create-ct.component';

describe('CreateCtComponent', () => {
  let component: CreateCtComponent;
  let fixture: ComponentFixture<CreateCtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCtComponent]
    });
    fixture = TestBed.createComponent(CreateCtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
