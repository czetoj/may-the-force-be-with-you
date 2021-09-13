import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  serverError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.login(this.user).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/characters']);
        }
      },
      err => {
        this.serverError = err.error.text;
        const to = setTimeout(() => {
          clearTimeout(to);
          this.serverError = '';
        }, 5000)
      }
    );
  }

}
