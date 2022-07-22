import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from '@app/modules/material-components.module';

import { EmpresasComponent } from './empresas.component';

describe('EmpresasComponent', () => {
  let component: EmpresasComponent;
  let fixture: ComponentFixture<EmpresasComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialComponentsModule, FormsModule, BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [EmpresasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasComponent);
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    defaultLoad();
    expect(component).toBeTruthy();
  });

  it('should add a new company in the list', () => {

    defaultLoad();

    component.adicionarEmpresa();

    expect(component.dataSource.data.length).toBe(3);

  });

  it('should NOT filter by name, due no filter', () => {

    defaultLoad();

    component.query = ''

    component.onFiltroChange();

    expect(component.dataSource.data.length).toBe(2);

  });

  it('should filter by name, just 1 result on the list', () => {

    defaultLoad();

    component.query = 'name'

    component.onFiltroChange();

    expect(component.dataSource.data.length).toBe(1);

  });

  it('should filter by name, no results found', () => {

    defaultLoad();

    component.query = 'test'

    component.onFiltroChange();

    expect(component.dataSource.data.length).toBe(0);

  });

  it('should remove the selected company', () => {

    let spyOnOpen = spyOn(component.snackBar, "open").and.callThrough();

    defaultLoad();

    component.remove('123');

    let deleteRequest = httpMock.expectOne('http://localhost:8090/secured/empresa/123');
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush({});

    expect(component.dataSource.data.length).toBe(1);
    expect(spyOnOpen).toHaveBeenCalledOnceWith('Sucesso!', 'Fechar');

  });

  it('should NOT remove the selected company due an error on the service', () => {

    let spyOnOpen = spyOn(component.snackBar, "open").and.callThrough();

    defaultLoad();

    component.remove('123');

    let deleteRequest = httpMock.expectOne('http://localhost:8090/secured/empresa/123');
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.error(new ErrorEvent('ERROR', { message: 'IT CAN NOT BE REMOVED.' }), { status: 400 });

    expect(component.dataSource.data.length).toBe(2);
    expect(spyOnOpen).toHaveBeenCalledOnceWith('IT CAN NOT BE REMOVED.', 'Fechar');

  });

  it('should create a new company', () => {

    defaultLoad();

    component.adicionarEmpresa();

    component.save(2);

    let saveRequest = httpMock.expectOne('http://localhost:8090/secured/empresa');
    expect(saveRequest.request.method).toBe('POST');
    saveRequest.flush({ 'id': '789', 'nome': 'nova' });

    expect(component.dataSource.data.length).toBe(3);
  });

  it('should NOT create a new company, due an error', () => {

    let spyOnOpen = spyOn(component.snackBar, "open").and.callThrough();

    defaultLoad();

    component.adicionarEmpresa();

    component.save(2);

    let saveRequest = httpMock.expectOne('http://localhost:8090/secured/empresa');
    expect(saveRequest.request.method).toBe('POST');
    saveRequest.error(new ErrorEvent('ERROR', { message: 'IT CAN NOT BE CREATED.' }), { status: 400 });

    expect(component.dataSource.data.length).toBe(2);
    expect(spyOnOpen).toHaveBeenCalledWith('IT CAN NOT BE CREATED.', 'Fechar');
  });

  function defaultLoad() {

    let searchRequest = httpMock.expectOne('http://localhost:8090/secured/empresa');
    expect(searchRequest.request.method).toBe('GET');
    searchRequest.flush([{ 'id': '123', 'nome': 'name' }, { 'id': '456', 'nome': 'outroNome' }]);

  }

});
