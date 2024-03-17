import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatMessageFieldComponent } from './privat-message-field.component';

describe('PrivatMessageFieldComponent', () => {
  let component: PrivatMessageFieldComponent;
  let fixture: ComponentFixture<PrivatMessageFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivatMessageFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivatMessageFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
