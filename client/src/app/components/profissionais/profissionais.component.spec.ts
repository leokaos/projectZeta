import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Profissional } from '@app/model/Profissional';
import { ProfissionaisComponent } from './profissionais.component';

describe('ProfissionaisComponent', () => {

  let component: ProfissionaisComponent;
  let fixture: ComponentFixture<ProfissionaisComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionaisComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule, RouterTestingModule.withRoutes([{ path: 'profissionais', component: ProfissionaisComponent }]), BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionaisComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load all profissionais', () => {

    const deserializeSpy = spyOn(Profissional.prototype, 'deserialize').and.callThrough();

    defaultLoad();

    expect(component.originalProfissionais.length).toBe(3);
    expect(deserializeSpy).toHaveBeenCalledTimes(3);
  });

  it('should filter profissional based on the filter', () => {

    defaultLoad();

    let event: InputEvent = new InputEvent('test', {data: 'test'});

    component.onFiltroChange(event);

    expect(component.profissinais.length).toBe(1);
  });

  function defaultLoad() {

    const req = httpMock.expectOne('http://localhost:8090/secured/profissional');
    expect(req.request.method).toBe('GET');

    req.flush([{ id: '123', nome: 'joe', sobrenome: 'smith' }, { id: '456', nome: 'joe', sobrenome: 'doe' }, { id: '789', nome: 'test', sobrenome: 'tester' }]);
  }

});
