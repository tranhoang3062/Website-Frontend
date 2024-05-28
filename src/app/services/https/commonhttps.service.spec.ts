import { TestBed } from '@angular/core/testing';

import { CommonhttpsService } from './commonhttps.service';

describe('CommonhttpsService', () => {
  let service: CommonhttpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonhttpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
