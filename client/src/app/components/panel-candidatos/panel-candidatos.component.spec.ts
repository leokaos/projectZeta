import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCandidatosComponent } from './panel-candidatos.component';

describe('PanelCandidatosComponent', () => {
  let component: PanelCandidatosComponent;
  let fixture: ComponentFixture<PanelCandidatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCandidatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
