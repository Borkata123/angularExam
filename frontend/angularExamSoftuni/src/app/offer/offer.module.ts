import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { OfferRouter } from './offer-routing-module';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateOfferComponent,
    EditComponent,
    DetailsComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OfferRouter,
    AppRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class OfferModule { }
