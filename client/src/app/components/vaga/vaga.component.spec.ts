import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVagasComponent } from './edit-vagas.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

describe('EditVagasComponent', () => {
  let component: EditVagasComponent;
  let fixture: ComponentFixture<EditVagasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditVagasComponent],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule, ApolloTestingModule, FormsModule, ReactiveFormsModule, CKEditorModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
