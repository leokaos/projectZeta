import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment'
import { Categoria } from '@app/model/Categoria';

const endpoint = environment.restApiurl + '/secured/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {

  }

  public listAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(endpoint);
  }

  public assemble(data: Categoria[]): Categoria[] {
    let innerCategorias: Categoria[] = [];
    data.map((categoria: Categoria) => { innerCategorias.push(new Categoria().deserialize(categoria)); });
    return innerCategorias;
  }

  public criar(Categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(endpoint, Categoria);
  }

  public remove(id: number) {
    return this.http.delete<Categoria>(endpoint + "/" + id);
  }

}
