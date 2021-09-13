import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = `${this.configService.apiUrl}/authentication/`;

  storageName: string = 'currentUser';
  currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  lastToken: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) {
    if (localStorage.currentUser) {
      const user: User = JSON.parse(localStorage.currentUser);
      this.lastToken = user.token || '';
      this.currentUserSubject$.next(user);
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject$.value;
  }

  login(loginData: User): Observable<User | null> {
    return this.http.post<{ user: User, token: string }>(
      this.loginUrl,
      loginData,
      {
        headers: new HttpHeaders({
          'Applicant-Id': '73cWh2EbpFX5Mpum',
        }),
      }
    ).pipe(
      map(response => {
        if (response.user && response.token) {
          this.lastToken = response.token;
          response.user.token = response.token;
          this.currentUserSubject$.next(response.user);
          localStorage.currentUser = JSON.stringify(response.user);
          return response.user;
        }
        return null;
      })
    );
  }

  logout() {
    this.lastToken = '';
    this.currentUserSubject$.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
