import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ListQualificacoesComponent } from './list-qualificacoes.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QualificacaoService } from '@app/services/qualificacao.service';
import { Observable, of } from 'rxjs';
import { Qualificacao } from '@app/model/Qualificacao';

describe('ListQualificacoesComponent', () => {
  let component: ListQualificacoesComponent;
  let fixture: ComponentFixture<ListQualificacoesComponent>;
  let qualificacaoService: QualificacaoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListQualificacoesComponent],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [QualificacaoService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    qualificacaoService = TestBed.get(QualificacaoService);

    spyOn(qualificacaoService, 'remover').and.callFake(() => { return of('') });

    spyOn(qualificacaoService, 'listAll').and.callFake(() => { return of([new Qualificacao().deserialize({ 'id': '123' })]) });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQualificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deveria remover o item da lista', () => {

    component.remover('123');

    expect(component.dataSource.data.length).toBe(0);

  });

});
