import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoQualificacoesComponent } from './list-tipo-qualificacoes.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListTipoQualificacoesComponent', () => {
  let component: ListTipoQualificacoesComponent;
  let fixture: ComponentFixture<ListTipoQualificacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListTipoQualificacoesComponent],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoQualificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
