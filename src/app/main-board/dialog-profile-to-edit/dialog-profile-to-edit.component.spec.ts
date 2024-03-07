import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileToEditComponent } from './dialog-profile-to-edit.component';

describe('DialogProfileToEditComponent', () => {
  let component: DialogProfileToEditComponent;
  let fixture: ComponentFixture<DialogProfileToEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfileToEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProfileToEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
