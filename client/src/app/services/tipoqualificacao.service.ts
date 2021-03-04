import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoQualificacao } from '@app/model/TipoQualificacao';
import { environment } from '@environment/environment'

const endpoint = environment.REST_API_URL + '/secured/categoria';

@Injectable({
  providedIn: 'root'
})
export class TipoQualificacaoService {

  constructor(private http: HttpClient) {

  }

  public listAll(): Observable<TipoQualificacao[]> {
    return this.http.get<TipoQualificacao[]>(endpoint);
  }

  public assemble(data: TipoQualificacao[]): TipoQualificacao[] {
    let innerTipoQualificacoes: TipoQualificacao[] = [];
    data.map((qualificacao: TipoQualificacao) => { innerTipoQualificacoes.push(new TipoQualificacao().deserialize(qualificacao)); });
    return innerTipoQualificacoes;
  }

  public criar(categoria: TipoQualificacao): Observable<TipoQualificacao> {
    return this.http.post<TipoQualificacao>(endpoint, categoria);
  }

  public remove(id: String) {
    return this.http.delete<TipoQualificacao>(endpoint + "/" + id);
  }

}
