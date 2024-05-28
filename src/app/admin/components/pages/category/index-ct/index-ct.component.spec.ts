import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCtComponent } from './index-ct.component';

describe('IndexCtComponent', () => {
  let component: IndexCtComponent;
  let fixture: ComponentFixture<IndexCtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCtComponent]
    });
    fixture = TestBed.createComponent(IndexCtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
