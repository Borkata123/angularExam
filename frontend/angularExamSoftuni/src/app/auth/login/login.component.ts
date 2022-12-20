import { Component, ElementRef, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  @ViewChild(
    NgForm,
    { static: true }
  ) form!: ElementRef<HTMLInputElement>

  loginHandler(form: NgForm): void{
    if(form.invalid) {return;}
    const { email, password } = form.value;
    this.authService.login(email, password).subscribe({
      next: ({ token, _id, email }) => {
        this.cookieService.set('user', JSON.stringify({ token, _id, email }));
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
