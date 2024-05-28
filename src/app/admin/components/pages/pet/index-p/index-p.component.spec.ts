import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPComponent } from './index-p.component';

describe('IndexPComponent', () => {
  let component: IndexPComponent;
  let fixture: ComponentFixture<IndexPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexPComponent]
    });
    fixture = TestBed.createComponent(IndexPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
