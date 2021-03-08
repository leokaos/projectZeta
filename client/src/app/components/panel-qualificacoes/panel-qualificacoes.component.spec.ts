import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelQualificacoesComponent } from './panel-qualificacoes.component';

describe('PanelQualificacoesComponent', () => {
  let component: PanelQualificacoesComponent;
  let fixture: ComponentFixture<PanelQualificacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelQualificacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelQualificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
