import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChatUserlistComponent } from './dialog-chat-userlist.component';

describe('DialogChatUserlistComponent', () => {
  let component: DialogChatUserlistComponent;
  let fixture: ComponentFixture<DialogChatUserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogChatUserlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogChatUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
