import { TestBed, inject } from '@angular/core/testing';

import { ProfissionalService } from './profissional.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Profissional } from '@app/model/Profissional';

describe('ProfissionalService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfissionalService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should create the service correctly', inject([ProfissionalService], (service: ProfissionalService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the whole candidate list', inject([HttpTestingController, ProfissionalService], (httpMock: HttpTestingController, service: ProfissionalService) => {

    service.listAll().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/profissional');
    expect(req.request.method).toEqual('GET');

    req.flush([{ "nome": "candidato 1", "id": "123" }]);

  }));

  it('should create a new Profissional', inject([HttpTestingController, ProfissionalService], (httpMock: HttpTestingController, service: ProfissionalService) => {

    let profissional = new Profissional();

    service.save(profissional).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/profissional');
    expect(req.request.method).toEqual('POST');

    req.flush({});

  }));

  it('should delete the Profissional with the given ID', inject([HttpTestingController, ProfissionalService], (httpMock: HttpTestingController, service: ProfissionalService) => {

    service.remove("123").subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/profissional/123');
    expect(req.request.method).toEqual('DELETE');

    req.flush({});

  }));

  it('should assemble all the objects', inject([ProfissionalService], (service: ProfissionalService) => {

    const deserializeSpy = spyOn(Profissional.prototype, 'deserialize');

    service.assemble([new Profissional(), new Profissional()]);

    expect(deserializeSpy).toHaveBeenCalledTimes(2);

  }));

  it('should search by ID', inject([HttpTestingController, ProfissionalService], (httpMock: HttpTestingController, service: ProfissionalService) => {

    service.buscarPorId('123').subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/profissional/123');
    expect(req.request.method).toEqual('GET');

    req.flush({});

  }));

  it('should save an existentent Profissional', inject([HttpTestingController, ProfissionalService], (httpMock: HttpTestingController, service: ProfissionalService) => {

    let profissional = new Profissional().deserialize({ id: '123' });

    service.save(profissional).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/profissional/123');
    expect(req.request.method).toEqual('PUT');

    req.flush({ id: '123' });

  }));

  it('should search by filter', inject([HttpTestingController, ProfissionalService], (httpMock: HttpTestingController, service: ProfissionalService) => {

    service.buscarPorFiltro({ test: '123', test2: 456 }).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/profissional?test=123&test2=456');
    expect(req.request.method).toEqual('GET');

    req.flush({ id: '123' });

  }));

});
