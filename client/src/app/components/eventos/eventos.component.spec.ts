import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosComponent } from './eventos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventosComponent', () => {
  let component: EventosComponent;
  let fixture: ComponentFixture<EventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventosComponent],
      imports: [MaterialComponentsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
