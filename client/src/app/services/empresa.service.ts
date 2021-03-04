import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '@app/model/Empresa';
import { environment } from '@environment/environment'

const endpoint = environment.REST_API_URL + '/secured/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) {

  }

  public listAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(endpoint);
  }

  public buscarPorFiltro(filtro: any): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(endpoint, { params: new HttpParams({ fromObject: filtro }) });
  }

  public assemble(data: Empresa[]): Empresa[] {
    let innerEmpresas: Empresa[] = [];
    data.map((empresa: Empresa) => { innerEmpresas.push(new Empresa().deserialize(empresa)); });
    return innerEmpresas;
  }

  public buscarPorId(id: string) {
    return this.http.get<Empresa>(endpoint + '/' + id);
  }

  public save(empresa: Empresa): Observable<Empresa> {

    if (empresa.id != null) {
      return this.http.put<Empresa>(endpoint + '/' + empresa.id, empresa);
    } else {
      return this.http.post<Empresa>(endpoint, empresa);
    }

  }

  public remove(id: String): Observable<any> {
    return this.http.delete(endpoint + '/' + id);
  }

}
