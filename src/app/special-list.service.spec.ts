import { TestBed } from '@angular/core/testing';

import { SpecialListService } from './special-list.service';

describe('SpecialListService', () => {
  let service: SpecialListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
