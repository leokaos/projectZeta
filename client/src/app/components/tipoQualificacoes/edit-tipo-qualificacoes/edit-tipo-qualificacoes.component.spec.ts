import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoQualificacoesComponent } from './edit-tipo-qualificacoes.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditTipoQualificacoesComponent', () => {
  let component: EditTipoQualificacoesComponent;
  let fixture: ComponentFixture<EditTipoQualificacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTipoQualificacoesComponent],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule, MatDialogModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipoQualificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
