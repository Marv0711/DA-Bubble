import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageChatWindowComponent } from './message-chat-window.component';

describe('MessageChatWindowComponent', () => {
  let component: MessageChatWindowComponent;
  let fixture: ComponentFixture<MessageChatWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageChatWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
