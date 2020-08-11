import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: string;

  constructor(private authenticateService: AuthenticateService) {
    this.authenticateService.currentUser.subscribe(x => this.user = x);
  }
}
