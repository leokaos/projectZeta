import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVagasComponent } from './list-vagas.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('ListVagasComponent', () => {
  let component: ListVagasComponent;
  let fixture: ComponentFixture<ListVagasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListVagasComponent],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule, ApolloTestingModule, DragDropModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
