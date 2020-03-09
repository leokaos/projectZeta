import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoQualificacao } from '@app/model/TipoQualificacao';

const endpoint = 'http://localhost:8090/secured/tipoQualificacao';

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

  public criar(tipoQualificacao: TipoQualificacao): Observable<TipoQualificacao> {
    return this.http.post<TipoQualificacao>(endpoint, tipoQualificacao);
  }

  public remove(id: String) {
    return this.http.delete<TipoQualificacao>(endpoint + "/" + id);
  }

}
