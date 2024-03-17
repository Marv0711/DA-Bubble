import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPrivatChatHeaderComponent } from './channel-privat-chat-header.component';

describe('ChannelPrivatChatHeaderComponent', () => {
  let component: ChannelPrivatChatHeaderComponent;
  let fixture: ComponentFixture<ChannelPrivatChatHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelPrivatChatHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelPrivatChatHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
