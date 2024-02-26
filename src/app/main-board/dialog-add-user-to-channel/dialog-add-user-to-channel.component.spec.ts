import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserToChannelComponent } from './dialog-add-user-to-channel.component';

describe('DialogAddUserToChannelComponent', () => {
  let component: DialogAddUserToChannelComponent;
  let fixture: ComponentFixture<DialogAddUserToChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUserToChannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddUserToChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
