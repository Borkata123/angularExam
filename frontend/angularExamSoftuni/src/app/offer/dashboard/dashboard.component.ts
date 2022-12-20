import { Component, OnInit } from '@angular/core';
import { IOffer } from 'src/app/shared/interfaces';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  offerList: IOffer[] | null = null;

  offerListLength: number = 0;

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService.loadOffers().subscribe({
      next: (value) => {
        console.log(value);
        this.offerListLength = value.length;
        this.offerList = value;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
