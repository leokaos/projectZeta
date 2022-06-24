import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vaga } from '@app/model/Vaga';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment'

const endpoint = environment.restApiurl + '/secured/vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  constructor(private http: HttpClient) {

  }

  public listAll(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(endpoint);
  }

  public buscarPorFiltro(filtro: any): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(endpoint, { params: new HttpParams({ fromObject: filtro }) });
  }

  public assemble(data: Vaga[]): Vaga[] {
    let innerVagas: Vaga[] = [];
    data.map((vaga: Vaga) => { innerVagas.push(new Vaga().deserialize(vaga)) });
    return innerVagas;
  }

  public buscarPorId(id: string) {
    return this.http.get<Vaga>(endpoint + '/' + id);
  }

  public salvar(vaga: Vaga): Observable<Vaga> {

    if (vaga.id != null) {
      return this.http.put<Vaga>(endpoint + '/' + vaga.id, Vaga);
    } else {
      return this.http.post<Vaga>(endpoint, Vaga);
    }
  }

  public remove(id: String): Observable<any> {
    return this.http.delete(endpoint + '/' + id);
  }

}
