import { TestBed } from '@angular/core/testing';

import { CloseEmojiService } from './close-emoji.service';

describe('CloseEmojiService', () => {
  let service: CloseEmojiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseEmojiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
