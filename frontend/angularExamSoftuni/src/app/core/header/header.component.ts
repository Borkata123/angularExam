import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IUser | null = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.getUser());
    this.user = this.authService.getUser();
  }

}
