import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDialogTextoVagaComponent } from './show-dialog-texto-vaga.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShowDialogTextoVagaComponent', () => {
  let component: ShowDialogTextoVagaComponent;
  let fixture: ComponentFixture<ShowDialogTextoVagaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDialogTextoVagaComponent],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule, MatDialogModule, HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { "vaga": {"contatoTelefone": "+49 123 456 789" } }},
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDialogTextoVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
