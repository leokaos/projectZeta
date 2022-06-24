import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Profissional } from '@app/model/Profissional';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment'

const endpoint = environment.restApiurl + '/secured/profissional';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  constructor(private http: HttpClient) {

  }

  public buscarPorFiltro(filtro: any): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(endpoint, { params: new HttpParams({ fromObject: filtro }) });
  }

  public listAll(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(endpoint);
  }

  public buscarPorId(id: string): Observable<Profissional> {
    return this.http.get<Profissional>(endpoint + '/' + id);
  }

  public assemble(data: Profissional[]): Profissional[] {
    let innerCandidates: Profissional[] = [];
    data.map((profissional: Profissional) => { innerCandidates.push(new Profissional().deserialize(profissional)); });
    return innerCandidates;
  }

  public save(profissional: Profissional): Observable<Profissional> {

    if (profissional.id != null) {
      return this.http.put<Profissional>(endpoint + '/' + profissional.id, profissional);
    } else {
      return this.http.post<Profissional>(endpoint, profissional);
    }

  }

  public remove(id: String): Observable<any> {
    return this.http.delete(endpoint + '/' + id);
  }

}
