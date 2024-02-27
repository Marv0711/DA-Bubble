import { TestBed } from '@angular/core/testing';

import { OpenChatWindowResponsiveService } from './open-chat-window-responsive.service';

describe('OpenChatWindowResponsiveService', () => {
  let service: OpenChatWindowResponsiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenChatWindowResponsiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
