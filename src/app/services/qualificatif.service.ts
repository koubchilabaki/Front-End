import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
<<<<<<< HEAD

import { Observable, of, BehaviorSubject } from 'rxjs';
import { range } from 'rxjs';
import { Qualificatif } from '../models/qualificatif';
=======
>>>>>>> 5cd874e7ebcd6c7e4e632f04dd9561a730da3481

@Injectable({
  providedIn: 'root'
})
export class QualificatifService {

  baseUrl = environment.baseUrl + '/qualificatifs';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  private options = { headers: this.headers}
  qualificatifSource = new  BehaviorSubject<Qualificatif>(null);
  qualificatifData: any;
  qualificatifSelected: Qualificatif;

  constructor(private httpClient: HttpClient) {
    this.qualificatifData= this.qualificatifSource.asObservable();
   }

  public findAll(): Observable<Qualificatif[]> {
    return this.httpClient.get<Qualificatif[]>(this.baseUrl);
  }

<<<<<<< HEAD
  addQualificatif(qualificatif: Qualificatif){
    return this.httpClient.post(this.baseUrl,qualificatif, {responseType: 'text' });
  }

  public delete(qualificatif: Qualificatif): Observable<string> {
    return this.httpClient.post(this.baseUrl + "/deleteQualificatif", qualificatif, { responseType: 'text' })
  }

  updateQualificatif(qualificatif: Qualificatif): Observable<string>{
=======
>>>>>>> 5cd874e7ebcd6c7e4e632f04dd9561a730da3481
    return this.httpClient.put(this.baseUrl, qualificatif, { responseType: 'text' })
  }

  changeQualificatifId(qualificatifSelected: Qualificatif){
    this.qualificatifSource.next(qualificatifSelected);
  }
}
