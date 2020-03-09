import { TestBed, inject } from '@angular/core/testing';

import { EventoService } from './evento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventoService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [EventoService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', inject([EventoService], (service: EventoService) => {
    expect(service).toBeTruthy();
  }));
});
