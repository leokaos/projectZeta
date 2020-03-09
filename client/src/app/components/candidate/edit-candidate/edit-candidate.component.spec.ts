import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateComponent, EDIT_CANDIDATE_QUERY } from './edit-candidate.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('EditCandidateComponent', () => {
  let component: EditCandidateComponent;
  let fixture: ComponentFixture<EditCandidateComponent>;
  let controller: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCandidateComponent],
      imports: [MaterialComponentsModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, ApolloTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    controller = TestBed.get(ApolloTestingController);
  });

  it('deveria criar componente sem falhas', () => {
    expect(component).toBeTruthy();
  });

  it('deveria buscar candidato sem qualificacoes', () => {

    expect(component).toBeTruthy();

    component.ngOnInit();

    let expectedData = { "data": { "todasAsQualificacoes": null, "candidatoPorId": null } };
    expectedData.data.todasAsQualificacoes = [{ "descricao": "java", "versao": "7", "id": "ABC" }];
    expectedData.data.candidatoPorId = { "nome": "Leonardo", "sobrenome": "Otero", "id": "10", "titulo": "bozo", "experiencias": [], "email": "test@test.com" };

    controller.expectOne(EDIT_CANDIDATE_QUERY).flush(expectedData);

    expect(component.candidato.id).toBe("10");
    expect(component.qualificacoes[0].descricao).toBe("java");
    expect(component.qualificacoes[0].versao).toBe("7");

    controller.verify();
  });

  it('deveria buscar candidato com qualificacoes, todas as qualificacoes no sistema e filtrar as que o candidato tem ', () => {

    expect(component).toBeTruthy();

    component.ngOnInit();

    let expectedData = { "data": { "todasAsQualificacoes": null, "candidatoPorId": null } };
    expectedData.data.todasAsQualificacoes = [{ "descricao": "java", "versao": "8", "id": "ABC" }];
    expectedData.data.candidatoPorId = { "nome": "Leonardo", "sobrenome": "Otero", "id": "10", "titulo": "bozo", "experiencias": [], "email": "teste@test.com" };

    controller.expectOne(EDIT_CANDIDATE_QUERY).flush(expectedData);

    expect(component.candidato.id).toBe("10");
    expect(component.qualificacoes[0].descricao).toBe("java");
    expect(component.qualificacoes[0].versao).toBe("8");

    controller.verify();
  });

  it('deveria filtrar uma qualificacao', () => {

    expect(component).toBeTruthy();

    let expectedData = { "data": { "todasAsQualificacoes": null, "candidatoPorId": null } };
    expectedData.data.todasAsQualificacoes = [{ "descricao": "java", "versao": "7", "id": "10" }, { "descricao": "java", "versao": "8", "id": "11" }];
    expectedData.data.candidatoPorId = { "nome": "Leonardo", "sobrenome": "Otero", "id": "10", "titulo": "bozo", "experiencias": [], "email": "teste@test.com" };

    component.ngOnInit();

    controller.expectOne(EDIT_CANDIDATE_QUERY).flush(expectedData);

    expect(component.candidato.id).toBe("10");

    expect(component.qualificacoes[0].descricao).toBe("java");
    expect(component.qualificacoes[0].versao).toBe("7");

    expect(component.qualificacoes[1].descricao).toBe("java");
    expect(component.qualificacoes[1].versao).toBe("8");

    controller.verify();
  });

});
