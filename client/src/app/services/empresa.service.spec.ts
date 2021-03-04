import { TestBed, inject } from '@angular/core/testing';

import { EmpresaService } from './empresa.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Empresa } from '@app/model/Empresa';

describe('EmpresaService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpresaService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should create the service correctly', inject([EmpresaService], (service: EmpresaService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the whole company list', inject([HttpTestingController, EmpresaService], (httpMock: HttpTestingController, service: EmpresaService) => {

    service.listAll().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/empresa');
    expect(req.request.method).toEqual('GET');

    req.flush([{ "nome": "empresa 1", "id": "123" }]);

  }));

  it('should create a new company', inject([HttpTestingController, EmpresaService], (httpMock: HttpTestingController, service: EmpresaService) => {

    let empresa = new Empresa();

    service.save(empresa).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/empresa');
    expect(req.request.method).toEqual('POST');

    req.flush({});

  }));

  it('should delete the company with the given ID', inject([HttpTestingController, EmpresaService], (httpMock: HttpTestingController, service: EmpresaService) => {

    service.remove("123").subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/empresa/123');
    expect(req.request.method).toEqual('DELETE');

    req.flush({});

  }));

  it('should assemble all the objects', inject([EmpresaService], (service: EmpresaService) => {

    const deserializeSpy = spyOn(Empresa.prototype, 'deserialize');

    service.assemble([new Empresa(), new Empresa()]);

    expect(deserializeSpy).toHaveBeenCalledTimes(2);

  }));

  it('should search by ID', inject([HttpTestingController, EmpresaService], (httpMock: HttpTestingController, service: EmpresaService) => {

    service.buscarPorId('123').subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/empresa/123');
    expect(req.request.method).toEqual('GET');

    req.flush({});

  }));

  it('should save an existentent company', inject([HttpTestingController, EmpresaService], (httpMock: HttpTestingController, service: EmpresaService) => {

    let empresa = new Empresa().deserialize({ id: '123' });

    service.save(empresa).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/empresa/123');
    expect(req.request.method).toEqual('PUT');

    req.flush({ id: '123' });

  }));

  it('should search by filter', inject([HttpTestingController, EmpresaService], (httpMock: HttpTestingController, service: EmpresaService) => {

    service.buscarPorFiltro({ test: '123', test2: 456 }).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/empresa?test=123&test2=456');
    expect(req.request.method).toEqual('GET');

    req.flush({ id: '123' });

  }));

});
