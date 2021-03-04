import { TestBed, inject } from '@angular/core/testing';

import { CandidatoService } from './candidato.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Candidato } from '@app/model/Candidato';

describe('CandidatoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatoService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should create the service correctly', inject([CandidatoService], (service: CandidatoService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the whole candidate list', inject([HttpTestingController, CandidatoService], (httpMock: HttpTestingController, service: CandidatoService) => {

    service.listAll().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/candidato');
    expect(req.request.method).toEqual('GET');

    req.flush([{ "nome": "candidato 1", "id": "123" }]);

  }));

  it('should create a new candidate', inject([HttpTestingController, CandidatoService], (httpMock: HttpTestingController, service: CandidatoService) => {

    let candidato = new Candidato();

    service.save(candidato).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/candidato');
    expect(req.request.method).toEqual('POST');

    req.flush({});

  }));

  it('should delete the candidate with the given ID', inject([HttpTestingController, CandidatoService], (httpMock: HttpTestingController, service: CandidatoService) => {

    service.remove("123").subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/candidato/123');
    expect(req.request.method).toEqual('DELETE');

    req.flush({});

  }));

  it('should assemble all the objects', inject([CandidatoService], (service: CandidatoService) => {

    const deserializeSpy = spyOn(Candidato.prototype, 'deserialize');

    service.assemble([new Candidato(), new Candidato()]);

    expect(deserializeSpy).toHaveBeenCalledTimes(2);

  }));

  it('should search by ID', inject([HttpTestingController, CandidatoService], (httpMock: HttpTestingController, service: CandidatoService) => {

    service.buscarPorId('123').subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/candidato/123');
    expect(req.request.method).toEqual('GET');

    req.flush({});

  }));

  it('should save an existentent candidate', inject([HttpTestingController, CandidatoService], (httpMock: HttpTestingController, service: CandidatoService) => {

    let candidato = new Candidato().deserialize({ id: '123' });

    service.save(candidato).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/candidato/123');
    expect(req.request.method).toEqual('PUT');

    req.flush({ id: '123' });

  }));

  it('should search by filter', inject([HttpTestingController, CandidatoService], (httpMock: HttpTestingController, service: CandidatoService) => {

    service.buscarPorFiltro({ test: '123', test2: 456 }).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/candidato?test=123&test2=456');
    expect(req.request.method).toEqual('GET');

    req.flush({ id: '123' });

  }));

});
