import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexOComponent } from './index-o.component';

describe('IndexOComponent', () => {
  let component: IndexOComponent;
  let fixture: ComponentFixture<IndexOComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexOComponent]
    });
    fixture = TestBed.createComponent(IndexOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
