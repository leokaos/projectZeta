import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoPanelComponent } from './evento-panel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventoPanelComponent', () => {
  let component: EventoPanelComponent;
  let fixture: ComponentFixture<EventoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventoPanelComponent],
      imports: [MaterialComponentsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
