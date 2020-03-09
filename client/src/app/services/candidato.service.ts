import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '@app/model/Candidato';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:8090/secured/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient) {

  }

  public listAll(): Candidato[] {

    let candidatos: Candidato[] = [];

    this.http.get<Candidato[]>(endpoint).subscribe((result: Array<any>) => { result.map((item: any) => { candidatos.push(new Candidato().deserialize(item)); }) });

    return candidatos;
  }

  public searchForId(id: string): Observable<Candidato> {
    return this.http.get<Candidato>(endpoint + '/' + id);
  }

  public assemble(data: Candidato[]): Candidato[] {
    let innerCandidates: Candidato[] = [];
    data.map((candidato: Candidato) => { innerCandidates.push(new Candidato().deserialize(candidato)); });
    return innerCandidates;
  }

  public atualizar(candidato: Candidato): Observable<Candidato> {
    return this.http.put<Candidato>(endpoint + '/' + candidato.id, candidato);
  }

  public salvar(candidato: Candidato): Observable<Candidato> {
    return this.http.post<Candidato>(endpoint, candidato);
  }

}
