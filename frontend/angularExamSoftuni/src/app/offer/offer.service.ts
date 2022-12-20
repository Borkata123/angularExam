import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOffer } from '../shared/interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  loadOffers() {
    return this.http.get<IOffer[]>(`${apiUrl}/offers`);
  }

  loadOneOffer(offerId: string) {
    return this.http.get<IOffer>(`${apiUrl}/offers/${offerId}`);
  }

  createOffer(title: string, companyLogoUrl: string, category: string, salary: string, description?: string, requirements?: string) {
    return this.http.post<IOffer>(`${apiUrl}/offers/create`, { title, companyLogoUrl, category, description, requirements, salary});
  }

  editOffer(offerId: string,title: string, companyLogoUrl: string, category: string, salary: string, description?: string, requirements?: string){
    return this.http.put<IOffer>(`${apiUrl}/offers/edit/${offerId}`, { title, companyLogoUrl, category, salary, description, requirements});
  }

  deleteOffer(offerId: string){
    return this.http.delete<IOffer>(`${apiUrl}/offers/delete/${offerId}`);
  }

  applyOffer(userId: string, offerId: string){
    return this.http.get<IOffer>(`${apiUrl}/offers/apply/${userId}/${offerId}`);
  }
}
