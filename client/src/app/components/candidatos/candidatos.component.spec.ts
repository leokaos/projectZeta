import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Candidato } from '@app/model/Candidato';
import { CandidatoComponent } from '../candidato/candidato.component';
import { CandidatosComponent } from './candidatos.component';

describe('CandidatosComponent', () => {

  let component: CandidatosComponent;
  let fixture: ComponentFixture<CandidatosComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatosComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule, RouterTestingModule.withRoutes([{ path: 'candidatos', component: CandidatoComponent }]), BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load all candidates', () => {

    const deserializeSpy = spyOn(Candidato.prototype, 'deserialize');

    defaultLoad();

    expect(component.originalCandidatos.length).toBe(3);
    expect(deserializeSpy).toHaveBeenCalledTimes(3);
  });

  it('should filter canidates based on the filter', () => {

    defaultLoad();

    component.onFiltroChange('joe doe')

    expect(component.candidatos.length).toBe(1);
  });

  function defaultLoad() {

    const req = httpMock.expectOne('http://localhost:8090/secured/candidato');
    expect(req.request.method).toBe('GET');

    req.flush([{ id: '123', nome: 'joe', sobrenome: 'smith' }, { id: '456', nome: 'joe', sobrenome: 'doe' }, { id: '789', nome: 'test', sobrenome: 'tester' }]);
  }

});
