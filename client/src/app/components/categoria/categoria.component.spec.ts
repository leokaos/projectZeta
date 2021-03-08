import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriaComponent } from './categoria.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('CategoriaComponent', () => {

  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaComponent],
      imports: [HttpClientTestingModule, MaterialComponentsModule, BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: MatDialogRef, useValue: { 'close': function () { } } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a category', () => {

    let spyOnClose = spyOn(component.dialog, "close").and.callThrough();

    component.onCriarClick();

    let createRequest = httpMock.expectOne('http://localhost:8090/secured/categoria');
    expect(createRequest.request.method).toBe('POST');

    createRequest.flush({});

    expect(spyOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show an error', () => {

    let spyOnOpen = spyOn(component.snackBar, "open").and.callThrough();

    component.onCriarClick();

    let createRequest = httpMock.expectOne('http://localhost:8090/secured/categoria');
    expect(createRequest.request.method).toBe('POST');

    createRequest.error(new ErrorEvent('ERROR', { message: 'IT CAN NOT BE CREATED.' }), { status: 400 });

    expect(spyOnOpen).toHaveBeenCalledOnceWith('IT CAN NOT BE CREATED.', 'Fechar');
  });

  it('should close the dialog', () => {

    let spyOnClose = spyOn(component.dialog, "close").and.callThrough();

    component.onCancelar();

    expect(spyOnClose).toHaveBeenCalledTimes(1);
  });

});
