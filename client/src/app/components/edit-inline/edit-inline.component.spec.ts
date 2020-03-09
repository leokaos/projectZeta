import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInlineComponent } from './edit-inline.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditInlineComponent', () => {
  let component: EditInlineComponent;
  let fixture: ComponentFixture<EditInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInlineComponent ],
      imports: [MaterialComponentsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule, ApolloTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
