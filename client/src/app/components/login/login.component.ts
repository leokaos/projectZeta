import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '@app/services/authenticate.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  showSpinner: Boolean = false;

  token: string;

  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  ngOnInit() { }

  login(): void {
    this.authenticateService.login(this.username, this.password).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.info('erro');
        });
  }

}
