import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { MaterialComponentsModule } from './modules/material-components.module';

describe('AppComponent', () => {
  let envServiceSpy = jasmine.createSpyObj('KeycloakService', ['getToken']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialComponentsModule, BrowserAnimationsModule],
      declarations: [AppComponent],
      providers: [KeycloakService, {
        provide: KeycloakService,
        useValue: envServiceSpy
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
