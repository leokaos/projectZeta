import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Categoria } from '@app/model/Categoria';
import { CategoriasComponent } from './categorias.component';

describe('CategoriasComponent', () => {

  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriasComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule, BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all the categories', () => {

    const deserializeSpy = spyOn(Categoria.prototype, 'deserialize');

    const req = httpMock.expectOne('http://localhost:8090/secured/categoria');
    expect(req.request.method).toBe('GET');

    req.flush([{ "id": "123" }, { "id": "456" }]);

    expect(component.categorias.length).toBe(2);
    expect(deserializeSpy).toHaveBeenCalledTimes(2);
  });

  it('should delete the category with no errors', () => {

    component.delete('123');

    let firstSearchRequest = httpMock.expectOne('http://localhost:8090/secured/categoria');
    firstSearchRequest.flush([]);

    let deleteRequest = httpMock.expectOne('http://localhost:8090/secured/categoria/123');
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush({});

    let secondSearchRequest = httpMock.expectOne('http://localhost:8090/secured/categoria');
    secondSearchRequest.flush([]);

  });

  it('should delete the category with errors', () => {

    const snackbarSpy = spyOn(TestBed.get(MatSnackBar), 'open');

    component.delete('123');

    let firstSearchRequest = httpMock.expectOne('http://localhost:8090/secured/categoria');
    firstSearchRequest.flush([]);

    let deleteRequest = httpMock.expectOne('http://localhost:8090/secured/categoria/123');
    deleteRequest.error(new ErrorEvent('ERROR', { message: 'IT CAN NOT BE DELETED.' }), { status: 400 });

    expect(snackbarSpy).toHaveBeenCalledOnceWith('IT CAN NOT BE DELETED.', 'Fechar');
  });

});
