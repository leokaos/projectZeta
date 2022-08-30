import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSumarioComponent } from './panel-sumario.component';

describe('PanelSumarioComponent', () => {
  let component: PanelSumarioComponent;
  let fixture: ComponentFixture<PanelSumarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSumarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSumarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
