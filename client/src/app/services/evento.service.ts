import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '@app/model/Evento';

const endpoint = 'http://localhost:8090/secured/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) {

  }

  public buscarPorFiltro(filtro: any): Observable<Evento[]> {
    return this.http.get<Evento[]>(endpoint, { params: new HttpParams({ fromObject: filtro }) });
  }


  public assemble(data: Evento[]): Evento[] {
    let innerEventos: Evento[] = [];
    data.map((evento: Evento) => { innerEventos.push(new Evento().deserialize(evento)); });
    return innerEventos;
  }
}
