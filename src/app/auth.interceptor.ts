import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable, from, lastValueFrom } from 'rxjs';
import { AuthService } from './services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // return next.handle(authReq);
        return from(this.handleAccess(request, next));
    }

    private async handleAccess(req: HttpRequest<any>, next: HttpHandler) {
        localStorage.removeItem('errToken');
        if (this.authService.isAuthenticated()) {
            await this.authService.refreshtoken(this.authService.token);
        }
        const authReq = await req.clone({
            headers: req.headers.set('Authorization', JSON.stringify({ access_token: this.authService.token }))
        });
        if (localStorage.getItem('errToken') == 'jwt expired') {
            return await lastValueFrom(EMPTY);
        }
        return await lastValueFrom(next.handle(authReq));
    }
}
