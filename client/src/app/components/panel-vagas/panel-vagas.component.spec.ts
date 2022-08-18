import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVagasComponent } from './panel-vagas.component';

describe('PanelVagasComponent', () => {
  let component: PanelVagasComponent;
  let fixture: ComponentFixture<PanelVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelVagasComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
