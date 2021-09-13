import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
