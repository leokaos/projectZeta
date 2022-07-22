import { TestBed, inject } from '@angular/core/testing';

import { CategoriaService } from './categoria.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Categoria } from '@app/model/Categoria';

describe('CategoriaService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaService, Categoria],
      imports: [HttpClientTestingModule]
    });
  });

  it('should create the service correctly', inject([CategoriaService], (service: CategoriaService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the whole category list', inject([HttpTestingController, CategoriaService], (httpMock: HttpTestingController, service: CategoriaService) => {

    service.listAll().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/categoria');
    expect(req.request.method).toEqual('GET');

    req.flush([{ "descricao": "categoria 1", "id": "123" }]);

  }));

  it('should create a new category', inject([HttpTestingController, CategoriaService], (httpMock: HttpTestingController, service: CategoriaService) => {

    let categoria = new Categoria();

    service.criar(categoria).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/categoria');
    expect(req.request.method).toEqual('POST');

    req.flush({});

  }));

  it('should delete the category with the given ID', inject([HttpTestingController, CategoriaService], (httpMock: HttpTestingController, service: CategoriaService) => {

    service.remove(123).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/categoria/123');
    expect(req.request.method).toEqual('DELETE');

    req.flush({});

  }));

  it('should assemble all the objects', inject([CategoriaService], (service: CategoriaService) => {

    const deserializeSpy = spyOn(Categoria.prototype, 'deserialize');

    service.assemble([new Categoria(), new Categoria()]);

    expect(deserializeSpy).toHaveBeenCalledTimes(2);

  }));

});
