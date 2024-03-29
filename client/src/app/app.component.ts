import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import jwt_decode from 'jwt-decode';
import { UserService } from './services/user.service';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: User;

  constructor(private keycloakService: KeycloakService, private userService: UserService) { }

  ngOnInit(): void {

    this.keycloakService.getToken().then(token => {

      let claims: any = jwt_decode(token);

      this.userService.buscarPorId(claims['uid']).subscribe(user => this.user = new User().deserialize(user));

    });

  }

}
