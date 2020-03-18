import { Injectable } from '@angular/core';
import { Promotion } from '../models/promotion';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotions: Promotion[];
  baseUrl = environment.baseUrl + '/promotions';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  private options = { headers: this.headers}

  constructor(private httpClient: HttpClient) { }



  public findAll(): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(this.baseUrl);
  }

  public getPromotion(codeFormation:string): Observable<Promotion[]>{
    return this.httpClient.get<Promotion[]>(`${this.baseUrl}/${codeFormation}`);
  }
}
