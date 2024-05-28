import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBComponent } from './index-b.component';

describe('IndexBComponent', () => {
  let component: IndexBComponent;
  let fixture: ComponentFixture<IndexBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexBComponent]
    });
    fixture = TestBed.createComponent(IndexBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
