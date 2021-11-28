import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelQualificacoesComponent } from './panel-qualificacoes.component';

describe('PanelQualificacoesComponent', () => {
  let component: PanelQualificacoesComponent;
  let fixture: ComponentFixture<PanelQualificacoesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PanelQualificacoesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelQualificacoesComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {

    httpMock.expectOne('http://localhost:8090/secured/vaga');

    expect(component).toBeTruthy();
  });
});
