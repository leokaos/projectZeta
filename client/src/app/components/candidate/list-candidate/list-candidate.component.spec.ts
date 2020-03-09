import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidateComponent, LIST_CANDIDATE_QUERY } from './list-candidate.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListCandidateComponent', () => {
  let component: ListCandidateComponent;
  let fixture: ComponentFixture<ListCandidateComponent>;
  let controller: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCandidateComponent],
      imports: [RouterTestingModule, FlexLayoutModule, MaterialComponentsModule, ApolloTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    controller = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('deveria buscar todos os candidatos', () => {

    expect(component).toBeTruthy();

    let expectedData = { "data": { "todosOsCandidatos": null } };
    expectedData.data.todosOsCandidatos = [];

    expectedData.data.todosOsCandidatos.push({ "nome": "Leonardo", "sobrenome": "Otero", "id": "5d40486f10794fef6bf3a4b5", "titulo": "Desenvolvedor Java Senior" });
    expectedData.data.todosOsCandidatos.push({ "nome": "Bozo", "sobrenome": "da Silva", "id": "5d40668bc7cc4356b2049978", "titulo": "Desenvolvedor Java Pleno" });

    controller.expectOne(LIST_CANDIDATE_QUERY).flush(expectedData);

    expect(component.candidatos.length).toBe(2);
  });
});
