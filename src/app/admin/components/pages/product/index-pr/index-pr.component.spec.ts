import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPrComponent } from './index-pr.component';

describe('IndexPrComponent', () => {
  let component: IndexPrComponent;
  let fixture: ComponentFixture<IndexPrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexPrComponent]
    });
    fixture = TestBed.createComponent(IndexPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
