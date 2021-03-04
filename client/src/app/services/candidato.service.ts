import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Candidato } from '@app/model/Candidato';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment'

const endpoint = environment.REST_API_URL + '/secured/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient) {

  }

  public buscarPorFiltro(filtro: any): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(endpoint, { params: new HttpParams({ fromObject: filtro }) });
  }

  public listAll(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(endpoint);
  }

  public buscarPorId(id: string): Observable<Candidato> {
    return this.http.get<Candidato>(endpoint + '/' + id);
  }

  public assemble(data: Candidato[]): Candidato[] {
    let innerCandidates: Candidato[] = [];
    data.map((candidato: Candidato) => { innerCandidates.push(new Candidato().deserialize(candidato)); });
    return innerCandidates;
  }

  public save(candidato: Candidato): Observable<Candidato> {

    if (candidato.id != null) {
      return this.http.put<Candidato>(endpoint + '/' + candidato.id, candidato);
    } else {
      return this.http.post<Candidato>(endpoint, candidato);
    }

  }

  public remove(id: String): Observable<any> {
    return this.http.delete(endpoint + '/' + id);
  }

}
