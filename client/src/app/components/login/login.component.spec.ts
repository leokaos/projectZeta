import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialComponentsModule, BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

  it('Should navigate to dashboard', () => {

    const navigateSpy = spyOn(TestBed.get(Router), 'navigate');
    const snackbarSpy = spyOn(TestBed.get(MatSnackBar), 'open');

    component.username = 'username'
    component.password = 'password'

    component.login();

    const req = httpMock.expectOne('http://localhost:8090/oauth/token?username=username&password=password&grant_type=password&client_id=client');
    expect(req.request.method).toBe('POST');

    req.flush({});

    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
    expect(snackbarSpy).not.toHaveBeenCalled();
  });

  it('Should show an error due error on login', () => {

    const navigateSpy = spyOn(TestBed.get(Router), 'navigate');
    const snackbarSpy = spyOn(TestBed.get(MatSnackBar), 'open');

    component.username = 'username'
    component.password = 'password'

    component.login();

    const req = httpMock.expectOne('http://localhost:8090/oauth/token?username=username&password=password&grant_type=password&client_id=client');
    req.error(new ErrorEvent('ERROR'), { status: 403, statusText: 'LOGIN ERROR' });

    expect(navigateSpy).not.toHaveBeenCalled();
    expect(snackbarSpy).toHaveBeenCalledWith('LOGIN ERROR');
  });

});
