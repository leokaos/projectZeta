import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPanelComponent } from './avatar-panel.component';

describe('AvatarPanelComponent', () => {
  let component: AvatarPanelComponent;
  let fixture: ComponentFixture<AvatarPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
