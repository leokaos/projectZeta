import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from '@services/authenticate.service';
import { Token } from '@model/Token';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticateService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser: Token = this.authenticationService.getUser();

        if (currentUser && currentUser.expiraEm > new Date()) {
            return true;
        }

        this.authenticationService.logout();
        this.router.navigate(['/login']);

        return true;
    }
}