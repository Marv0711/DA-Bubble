import { TestBed } from '@angular/core/testing';

import { PopupMsgService } from './popup-msg.service';

describe('PopupMsgService', () => {
  let service: PopupMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
