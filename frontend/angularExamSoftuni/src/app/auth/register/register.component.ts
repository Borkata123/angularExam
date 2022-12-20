import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { appEmailValidator, sameValueGroupValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = this.fb.group({
    email: ['', [Validators.required, appEmailValidator(['bg', 'com'])]],
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: []
    }, {
      validators: [sameValueGroupValidator('password', 'repeatPassword')]
    })
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  registerHandler(){
    if(this.form.invalid) {return;}
    const { email, pass: {password, repeatPassword} = {} } = this.form.value;
    this.authService.register(email!, password!).subscribe({
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
