import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUser() {
    if (this.cookieService.get('user')) {
      return JSON.parse(this.cookieService.get('user'));
    } else {
      return null;
    }
  }

  register(email: string, password: string) {
    return this.http.post<any>(`${apiUrl}/users/register`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${apiUrl}/users/login`, { email, password });
  }
}
