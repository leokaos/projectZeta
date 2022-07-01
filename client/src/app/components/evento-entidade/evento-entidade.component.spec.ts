import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { EventoEntidadeComponent } from './evento-entidade.component';

describe('EventoEntidadeComponent', () => {

  let component: EventoEntidadeComponent;
  let fixture: ComponentFixture<EventoEntidadeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventoEntidadeComponent],
      imports: [HttpClientTestingModule, MaterialComponentsModule, BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: MatDialogRef, useValue: { 'close': function () { } } }, {provide: MAT_DIALOG_DATA, useValue: {}}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoEntidadeComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
