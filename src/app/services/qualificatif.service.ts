import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {Qualificatif} from '../models/qualificatif';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

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

  addQualificatif(qualificatif: any){
    return this.httpClient.post(this.baseUrl, qualificatif, {responseType: 'text' });
  }

  public delete(qualificatif: Qualificatif): Observable<string> {
    return this.httpClient.post(this.baseUrl + '/deleteQualificatif', qualificatif, { responseType: 'text' })
  }

  updateQualificatif(qualificatif: Qualificatif): Observable<string> {
    return this.httpClient.put(this.baseUrl, qualificatif, { responseType: 'text' })
  }

  changeQualificatifId(qualificatifSelected: Qualificatif){
    this.qualificatifSource.next(qualificatifSelected);
  }
}
