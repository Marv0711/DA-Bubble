import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelChatCompleteComponent } from './channel-chat-complete.component';

describe('ChannelChatCompleteComponent', () => {
  let component: ChannelChatCompleteComponent;
  let fixture: ComponentFixture<ChannelChatCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelChatCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelChatCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
