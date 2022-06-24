import { Component } from '@angular/core';
import { Token } from '@model/Token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: Token;

  /*constructor(private authenticateService: AuthenticateService) {
    this.authenticateService.currentUser.subscribe(x => this.user = x);
  }*/
}
