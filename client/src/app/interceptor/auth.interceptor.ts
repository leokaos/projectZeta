import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private keycloakService: KeycloakService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return from(this.keycloakService.getToken()).pipe(

            switchMap(token => {
                const headers = request.headers.set('Authorization', 'Bearer ' + token);
                const reqClone = request.clone({ headers });
                return next.handle(reqClone);
            })
        );

    }
}