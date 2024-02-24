import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceMenuTogglebarComponent } from './workspace-menu-togglebar.component';

describe('WorkspaceMenuTogglebarComponent', () => {
  let component: WorkspaceMenuTogglebarComponent;
  let fixture: ComponentFixture<WorkspaceMenuTogglebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceMenuTogglebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceMenuTogglebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
