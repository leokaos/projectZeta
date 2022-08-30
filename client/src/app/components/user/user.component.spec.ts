import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { KeycloakService } from 'keycloak-angular';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let envServiceSpy = jasmine.createSpyObj('KeycloakService', ['getToken']);

  envServiceSpy.getToken.and.returnValue(Promise.resolve(""));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, MaterialComponentsModule, NoopAnimationsModule, FormsModule],
      providers: [KeycloakService, { provide: KeycloakService, useValue: envServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
