import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modified = req.clone({ setHeaders: { 'Authorization': 'Bearer 67f475b8-1fb8-42c4-9253-cb95eea2c996' } });
        return next.handle(req);
    }

}