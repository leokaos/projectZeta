import { TestBed, inject } from '@angular/core/testing';

import { TipoQualificacaoService } from './tipoqualificacao.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TipoQualificacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoQualificacaoService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([TipoQualificacaoService], (service: TipoQualificacaoService) => {
    expect(service).toBeTruthy();
  }));
});
