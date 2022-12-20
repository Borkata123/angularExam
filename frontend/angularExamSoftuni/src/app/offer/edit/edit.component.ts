import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOffer } from 'src/app/shared/interfaces';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  offer: IOffer | null = null;

  form = this.fb.group({
    title: ['', Validators.required],
    companyLogoUrl: ['', Validators.required],
    category: ['', Validators.required],
    description: [''],
    requirements: [''],
    salary: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private offerService: OfferService, private router: Router) { }

  editHandler(){
    if(this.form.invalid) { return; }
    console.log(this.form.value);
    if(this.offer){
      let { title, companyLogoUrl, category, description, requirements, salary} = this.form.value;
      this.offerService.editOffer(this.offer._id, title!, companyLogoUrl!, category!, salary!, description!, requirements!).subscribe(res => console.log(res));
      this.router.navigate([`/offers/${this.offer._id}`]);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.offerService.loadOneOffer(params['id']).subscribe({
        next: (value) => {
          this.offer = value;
          this.form.get('title')?.setValue(this.offer.title);
          this.form.get('companyLogoUrl')?.setValue(this.offer.companyLogoUrl);
          this.form.get('category')?.setValue(this.offer.category);
          this.form.get('description')?.setValue(this.offer.description);
          this.form.get('requirements')?.setValue(this.offer.requirements);
          this.form.get('salary')?.setValue(this.offer.salary);
        },
        error: (err) => {
          console.error(err);
        }
      })
    });
  }

}
