import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileViewComponent } from './dialog-profile-view.component';

describe('DialogProfileViewComponent', () => {
  let component: DialogProfileViewComponent;
  let fixture: ComponentFixture<DialogProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfileViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
