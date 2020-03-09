import { TestBed, inject } from '@angular/core/testing';

import { CandidatoService } from './candidato.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CandidatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatoService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([CandidatoService], (service: CandidatoService) => {
    expect(service).toBeTruthy();
  }));
});
