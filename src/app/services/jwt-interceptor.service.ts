import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = this.authService.lastToken;

    if (currentToken) {
      request = request.clone({
        setHeaders: {
          'Application-Authorization': `Bearer ${currentToken}`,
        },
      });
    }

    return next.handle(request);
  }

}
