
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashComponent } from './dash.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DashComponent', () => {
  let component: DashComponent;
  let fixture: ComponentFixture<DashComponent>;
  let httpMock: HttpTestingController;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashComponent],
      imports: [MaterialComponentsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
