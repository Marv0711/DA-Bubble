import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoarderHeaderComponent } from './dialog-boarder-header.component';

describe('DialogBoarderHeaderComponent', () => {
  let component: DialogBoarderHeaderComponent;
  let fixture: ComponentFixture<DialogBoarderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBoarderHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBoarderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
