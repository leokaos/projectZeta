import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQualificacoesComponent } from './edit-qualificacoes.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditQualificacoesComponent', () => {
  let component: EditQualificacoesComponent;
  let fixture: ComponentFixture<EditQualificacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditQualificacoesComponent],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQualificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
