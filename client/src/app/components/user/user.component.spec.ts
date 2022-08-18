import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      imports: [HttpClientTestingModule, MaterialComponentsModule, NoopAnimationsModule],
      providers: [KeycloakService, {
        provide: KeycloakService,
        useValue: envServiceSpy
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
