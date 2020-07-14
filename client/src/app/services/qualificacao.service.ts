import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Qualificacao } from '@app/model/Qualificacao';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment'

const endpoint = environment.REST_API_URL + '/secured/qualificacao';

@Injectable({
  providedIn: 'root'
})
export class QualificacaoService {

  constructor(private http: HttpClient) {

  }

  public listAll(): Observable<Qualificacao[]> {
    return this.http.get<Qualificacao[]>(endpoint);
  }

  public buscarPorFiltro(filtro: any): Observable<Qualificacao[]> {
    return this.http.get<Qualificacao[]>(endpoint, { params: new HttpParams({ fromObject: filtro }) });
  }

  public assemble(data: Qualificacao[]): Qualificacao[] {
    let innerQualificacoes: Qualificacao[] = [];
    data.map((qualificacao: Qualificacao) => { innerQualificacoes.push(new Qualificacao().deserialize(qualificacao)); });
    return innerQualificacoes;
  }

  public buscarPorId(id: string) {
    return this.http.get<Qualificacao>(endpoint + '/' + id);
  }

  public salvar(qualificacao: Qualificacao): Observable<Qualificacao> {

    if (qualificacao.id != null) {
      return this.http.put<Qualificacao>(endpoint + '/' + qualificacao.id, qualificacao);
    } else {
      return this.http.post<Qualificacao>(endpoint, qualificacao);
    }
  }

  public remover(id: String): Observable<any> {
    return this.http.delete(endpoint + '/' + id);
  }

}
