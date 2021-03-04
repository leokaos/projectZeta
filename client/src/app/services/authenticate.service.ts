import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '@model/Token'

const endpoint = environment.REST_API_URL + '/oauth/token';
const client = environment.REST_CLIENT;
const clientPassword = environment.REST_CLIENT_SECRET;

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Token>(new Token().deserialize(JSON.parse(localStorage.getItem('currentUser'))));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: string, password: string) {

    let params = {
      "username": user,
      "password": password,
      "grant_type": "password",
      "client_id": client
    };

    let headers = {
      'Content-Type': 'application/json',
      'authorization': 'Basic ' + btoa(client + ':' + clientPassword)
    };

    return this.http.post<any>(endpoint, null, { params: params, headers: headers, withCredentials: true })
      .pipe(map(user => {

        let token = new Token().convert(user);

        localStorage.setItem('currentUser', JSON.stringify(token));
        this.currentUserSubject.next(token);

        return token;

      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public getUser(): Token {
    return this.currentUserSubject.value;
  }

}
