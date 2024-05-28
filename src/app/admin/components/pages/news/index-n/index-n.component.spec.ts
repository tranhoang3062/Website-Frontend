import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNComponent } from './index-n.component';

describe('IndexNComponent', () => {
  let component: IndexNComponent;
  let fixture: ComponentFixture<IndexNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexNComponent]
    });
    fixture = TestBed.createComponent(IndexNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
