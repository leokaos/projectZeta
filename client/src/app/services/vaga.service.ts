import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '@app/model/Vaga';

const endpoint = 'http://localhost:8090/secured/vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  constructor(private http: HttpClient) { }

  public listAll(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(endpoint);
  }

  public assemble(data: Vaga[]): Vaga[] {
    let innerVagas: Vaga[] = [];
    data.map((vaga: Vaga) => { innerVagas.push(new Vaga().deserialize(vaga)); });
    return innerVagas;
  }

  public criar(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(endpoint, vaga);
  }

  public remove(id: String) {
    return this.http.delete<Vaga>(endpoint + "/" + id);
  }

  public searchForId(id: string): Observable<Vaga> {
    return this.http.get<Vaga>(endpoint + '/' + id);
  }

  public salvar(vaga: Vaga): Observable<Vaga> {
    return this.http.put<Vaga>(endpoint + '/' + vaga.id, Vaga);
  }

}
