import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  constructor(private offerService: OfferService, private router: Router) { }

  createHandler(form: NgForm){
    if(form.invalid) { return; }
    console.log(form.value);
    let { title, imageUrl, category, description, requirements, salary} = form.value;
    this.offerService.createOffer(title, imageUrl, category, salary, description, requirements).subscribe(res => console.log(res));
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
  }

}
