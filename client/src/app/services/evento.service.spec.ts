import { TestBed, inject } from '@angular/core/testing';

import { EventoService } from './Evento.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Evento } from '@app/model/Evento';

describe('EventoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventoService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should assemble all the objects', inject([EventoService], (service: EventoService) => {

    const deserializeSpy = spyOn(Evento.prototype, 'deserialize');

    service.assemble([new Evento(), new Evento()]);

    expect(deserializeSpy).toHaveBeenCalledTimes(2);

  }));

  it('should search by filter', inject([HttpTestingController, EventoService], (httpMock: HttpTestingController, service: EventoService) => {

    service.buscarPorFiltro({ test: '123', test2: 456 }).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/secured/evento?test=123&test2=456');
    expect(req.request.method).toEqual('GET');

    req.flush({ id: '123' });

  }));

});
