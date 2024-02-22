import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelChatWindowComponent } from './channel-chat-window.component';

describe('ChannelChatWindowComponent', () => {
  let component: ChannelChatWindowComponent;
  let fixture: ComponentFixture<ChannelChatWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelChatWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
