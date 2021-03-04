import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Qualificacao } from '@app/model/Qualificacao';
import { AuthenticateService } from '@app/services/authenticate.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  showSpinner: Boolean = false;

  token: string;

  constructor(private router: Router, private authenticateService: AuthenticateService, private snackBar: MatSnackBar) { }

  login(): void {

    this.authenticateService.login(this.username, this.password).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.snackBar.open(error.statusText);
        }
      );
  }

}
