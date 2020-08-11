import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { AuthenticateService } from './services/authenticate.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(private athenticateService: AuthenticateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.headers.get('Authorization')) {

            let tokenizedReq = req.clone({
                headers: req.headers.set('Authorization','Bearer ' + this.athenticateService.getUser()),
            })

            return next.handle(tokenizedReq);
        }

        return next.handle(req);
    }

}