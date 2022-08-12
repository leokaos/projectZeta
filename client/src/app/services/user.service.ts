import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment'
import { User } from '@model/User';

const endpoint = environment.restApiurl + '/secured/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public listAll(): Observable<User[]> {
    return this.http.get<User[]>(endpoint);
  }

  public assemble(data: User[]): User[] {
    let innerUsers: User[] = [];
    data.map((user: User) => { innerUsers.push(new User().deserialize(user)); });
    return innerUsers; 
  }

  public buscarPorId(id: string){
    return this.http.get<User>(endpoint + "/" + id);
  }

  public criar(user: User): Observable<User> {
    return this.http.post<User>(endpoint, user);
  }

  public remove(id: number) {
    return this.http.delete<User>(endpoint + "/" + id);
  }

}
