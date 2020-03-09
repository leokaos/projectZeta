import { TestBed, inject } from '@angular/core/testing';

import { QualificacaoService } from './qualificacao.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QualificacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualificacaoService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([QualificacaoService], (service: QualificacaoService) => {
    expect(service).toBeTruthy();
  }));
});
