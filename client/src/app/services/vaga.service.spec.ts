import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Vaga } from '@app/model/Vaga';
import { VagaService } from '@services/vaga.service';

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

  it('should return the whole entity list', inject([HttpTestingController, VagaService], (httpMock: HttpTestingController, service: VagaService) => {

    service.listAll().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/vaga');
    expect(req.request.method).toEqual('GET');

    req.flush([{ 'descricao': 'Vaga 1', 'id': '123' }]);

  }));

  it('should create a new entity', inject([HttpTestingController, VagaService], (httpMock: HttpTestingController, service: VagaService) => {

    let vaga = new Vaga();

    service.salvar(vaga).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/vaga');
    expect(req.request.method).toEqual('POST');

    req.flush({});

  }));

  it('should update a new entity', inject([HttpTestingController, VagaService], (httpMock: HttpTestingController, service: VagaService) => {

    let vaga = new Vaga().deserialize({ 'id': '123' });

    service.salvar(vaga).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/vaga/123');
    expect(req.request.method).toEqual('PUT');

    req.flush({});

  }));

  it('should delete the entity with the given ID', inject([HttpTestingController, VagaService], (httpMock: HttpTestingController, service: VagaService) => {

    service.remove('123').subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/vaga/123');
    expect(req.request.method).toEqual('DELETE');

    req.flush({});

  }));

  it('should assemble all the objects', inject([VagaService], (service: VagaService) => {

    const deserializeSpy = spyOn(Vaga.prototype, 'deserialize');

    service.assemble([new Vaga(), new Vaga()]);

    expect(deserializeSpy).toHaveBeenCalledTimes(2);

  }));

  it('should search by ID', inject([HttpTestingController, VagaService], (httpMock: HttpTestingController, service: VagaService) => {

    service.buscarPorId('123').subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/vaga/123');
    expect(req.request.method).toEqual('GET');

    req.flush({});

  }));

  it('should search by filter', inject([HttpTestingController, VagaService], (httpMock: HttpTestingController, service: VagaService) => {

    service.buscarPorFiltro({ 'test': '123' }).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/vaga?test=123');
    expect(req.request.method).toEqual('GET');

    req.flush({});

  }));

});
