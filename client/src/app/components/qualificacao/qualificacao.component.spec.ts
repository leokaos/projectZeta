import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Categoria } from '@app/model/Categoria';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { QualificacoesComponent } from '../qualificacoes/qualificacoes.component';
import { QualificacaoComponent } from './qualificacao.component';

describe('QualificacaoComponent', () => {
  let component: QualificacaoComponent;
  let fixture: ComponentFixture<QualificacaoComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualificacaoComponent],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule.withRoutes([{ path: 'qualificacoes', component: QualificacoesComponent }]), BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '123' }) } } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificacaoComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get the ID from the router', () => {

    defaultLoad();

    expect(component.dataSource.data.length).toBe(1);
    expect(component.categorias.length).toBe(2);
    expect(component.todasAsQualificacoesDoTipo.length).toBe(1);

  });

  it('should save the qualification and return an error', () => {

    let spyOnOpen = spyOn(component.snackBar, 'open').and.callThrough();

    defaultLoad();

    component.salvar();

    let createRequest = httpMock.expectOne('http://localhost:8090/secured/qualificacao/456');
    expect(createRequest.request.method).toBe('PUT');

    createRequest.error(new ErrorEvent('ERROR', { message: 'IT CAN NOT BE CREATED.' }), { status: 400 });

    expect(spyOnOpen).toHaveBeenCalledOnceWith('IT CAN NOT BE CREATED.', 'Fechar');

  });

  it('should save the qualification and return a success', () => {

    let spyOnOpen = spyOn(component.snackBar, 'open').and.callThrough();

    defaultLoad();

    component.salvar();

    let createRequest = httpMock.expectOne('http://localhost:8090/secured/qualificacao/456');
    expect(createRequest.request.method).toBe('PUT');

    createRequest.flush({});

    expect(spyOnOpen).toHaveBeenCalledOnceWith('Qualificacao salva com sucesso!', 'Fechar');

    router.navigate(['qualificacoes']).then(() => {
      expect(router.url).toBe('/qualificacoes');
    });

  });

  it('should add an equivalency', () => {

    defaultLoad();

    component.adicionarEquivalencia();

    expect(component.dataSource.data.length).toBe(2);

  });

  it('should remove an equivalency', () => {

    defaultLoad();

    component.removerEquivalencia(0);

    expect(component.dataSource.data.length).toBe(0);

  });

  it('should change the category', () => {

    defaultLoad();

    expect(component.qualificacao.equivalencias.length).toBe(1);

    component.onChangeCategoria(new Categoria().deserialize({ id: '789' }));

    let searchByCategoria = httpMock.expectOne('http://localhost:8090/secured/qualificacao?categoria.id=789');
    expect(searchByCategoria.request.method).toBe('GET');

    searchByCategoria.flush({});

    expect(component.qualificacao.equivalencias.length).toBe(0);

  });

  it('should return the comparation correctly', () => {

    defaultLoad();

    expect(component.idComparator({ id: '123' }, { id: '123' })).toBeTrue();
    expect(component.idComparator({ id: '123' }, { id: '456' })).toBeFalse();
  });

  function defaultLoad() {

    let searchByIdRequest = httpMock.expectOne('http://localhost:8090/secured/qualificacao/123');
    expect(searchByIdRequest.request.method).toBe('GET');
    searchByIdRequest.flush({ 'id': '456', 'descricao': 'q1', 'versao': '1', 'categoria': { 'id': '456', 'descricao': 'Categoria 1' }, 'equivalencias': [{}] });

    let searchCategorias = httpMock.expectOne('http://localhost:8090/secured/categoria');
    expect(searchCategorias.request.method).toBe('GET');
    searchCategorias.flush([{ 'id': '123', 'descricao': 'Categoria 2' }, { 'id': '456', 'descricao': 'Categoria 1' }]);

    let searchByCategoria = httpMock.expectOne('http://localhost:8090/secured/qualificacao?categoria.id=456');
    expect(searchByCategoria.request.method).toBe('GET');

    searchByCategoria.flush(
      [
        { 'descricao': 'q1', 'versao': '1', 'categoria': { 'id': '456', 'descricao': 'Categoria 1' }, 'equivalencias': [{}] },
        { 'descricao': 'q1', 'versao': '2', 'categoria': { 'id': '456', 'descricao': 'Categoria 1' }, 'equivalencias': [{}] }
      ]
    );

  }

});