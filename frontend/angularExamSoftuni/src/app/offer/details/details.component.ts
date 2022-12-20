import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IOffer, IUser } from 'src/app/shared/interfaces';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  offer: IOffer | null = null;

  user: IUser | null = null;

  isOwner: boolean = false;

  hasApplied: boolean = false;

  constructor(private offerService: OfferService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.activatedRoute.params.subscribe(params => {
      this.offerService.loadOneOffer(params['id']).subscribe({
        next: (value) => {
          console.log(value);
          this.offer = value;
          value.owner === this.user?._id ? this.isOwner = true : this.isOwner = false;
          if (this.user) {
            value.applications.includes(this.user?._id) ? this.hasApplied = true : this.hasApplied = false;
          }
        },
        error: (err) => {
          console.error(err);
        }
      })
    })
  }

  applyHandler() {
    if (this.user && this.offer) {
      if (this.hasApplied === false) {
        this.offerService.applyOffer(this.user._id, this.offer._id).subscribe(res => console.log(res));
      }
    }
  }

}
