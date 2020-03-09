import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VagaService } from './vaga.service';

describe('VagaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VagaService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([VagaService], (service: VagaService) => {
    expect(service).toBeTruthy();
  }));
});
