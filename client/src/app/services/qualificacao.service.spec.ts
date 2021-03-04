import { TestBed, inject } from '@angular/core/testing';

import { QualificacaoService } from './qualificacao.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Qualificacao } from '@app/model/Qualificacao';

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

  it('should return the whole qualification list', inject([HttpTestingController, QualificacaoService], (httpMock: HttpTestingController, service: QualificacaoService) => {

    service.listAll().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao');
    expect(req.request.method).toEqual('GET');

    req.flush([{ "descricao": "Qualificacao 1", "id": "123" }]);

  }));

  it('should create a new qualification', inject([HttpTestingController, QualificacaoService], (httpMock: HttpTestingController, service: QualificacaoService) => {

    let qualificacao = new Qualificacao();

    service.salvar(qualificacao).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao');
    expect(req.request.method).toEqual('POST');

    req.flush({});

  }));

  it('should update a new qualification', inject([HttpTestingController, QualificacaoService], (httpMock: HttpTestingController, service: QualificacaoService) => {

    let qualificacao = new Qualificacao().deserialize({ "id": "123" });

    service.salvar(qualificacao).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao/123');
    expect(req.request.method).toEqual('PUT');

    req.flush({});

  }));

  it('should delete the qualification with the given ID', inject([HttpTestingController, QualificacaoService], (httpMock: HttpTestingController, service: QualificacaoService) => {

    service.remove("123").subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao/123');
    expect(req.request.method).toEqual('DELETE');

    req.flush({});

  }));

  it('should assemble all the objects', inject([QualificacaoService], (service: QualificacaoService) => {

    const deserializeSpy = spyOn(Qualificacao.prototype, 'deserialize');

    let qualificacoes = service.assemble([new Qualificacao(), new Qualificacao()]);

    expect(deserializeSpy).toHaveBeenCalledTimes(2);

  }));

  it('should search by ID', inject([HttpTestingController, QualificacaoService], (httpMock: HttpTestingController, service: QualificacaoService) => {

    service.buscarPorId("123").subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao/123');
    expect(req.request.method).toEqual('GET');

    req.flush({});

  }));

  it('should search by filter', inject([HttpTestingController, QualificacaoService], (httpMock: HttpTestingController, service: QualificacaoService) => {

    service.buscarPorFiltro({ 'test': '123' }).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao?test=123');
    expect(req.request.method).toEqual('GET');

    req.flush({});

  }));

});
