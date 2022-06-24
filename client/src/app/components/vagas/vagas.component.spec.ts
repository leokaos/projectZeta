import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { StompService } from '@app/services/stomp.service';
import { Observable } from 'rxjs';
import { VagasComponent } from './vagas.component';

describe('VagasComponent', () => {

  let component: VagasComponent;
  let fixture: ComponentFixture<VagasComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VagasComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, MaterialComponentsModule, FormsModule],
      providers: [{ provide: StompService, useValue: { subscribe: (topic: String) => { return new Observable(() => { }); } } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagasComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load the oportunities into the list', () => {

    defaultLoad();

    expect(component.listas['SELECIONANDO_CANDIDATOS'].data.length).toBe(1);
    expect(component.listas['NOVA'].data.length).toBe(1);

  });

  function defaultLoad() {

    let searchVagas = httpMock.expectOne('http://localhost:8090/secured/vaga');
    expect(searchVagas.request.method).toBe('GET');
    searchVagas.flush([{ 'status': 'SELECIONANDO_CANDIDATOS' }, { 'status': 'NOVA' }]);

  }

});