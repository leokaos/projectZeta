import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { KeycloakService } from 'keycloak-angular';
import jwt_decode from 'jwt-decode';
import { User } from '@app/model/User';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService,
    private keycloakService: KeycloakService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.keycloakService.getToken().then(token => {
      let claims: any = jwt_decode(token);
      this.userService.buscarPorId(claims['uid']).subscribe(user => this.user = new User().deserialize(user));
    });

  }

  public salvar() {

    this.userService.salvar(this.user).subscribe({
      next: (data: any) => {
        this.router.navigate(['']);
        this.snackBar.open('Configurações salvas com sucesso!', 'Fechar');
      },
      error: (err: any) => this.snackBar.open(err.error.message, 'Fechar')
    });

  }

}
