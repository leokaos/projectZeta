import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticateService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.authenticationService.getUser();

        if (currentUser) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}