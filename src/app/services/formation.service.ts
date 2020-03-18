import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {Qualificatif} from '../models/qualificatif';
import {Formation} from '../models/formation';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  baseUrl = environment.baseUrl + '/formations';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  private options = { headers: this.headers}
  formationSource = new  BehaviorSubject<Formation>(null);
  formationData: any;

  constructor(private httpClient: HttpClient) {
    this.formationData= this.formationSource.asObservable();
   }

  public findAll(): Observable<Formation[]> {
    return this.httpClient.get<Formation[]>(this.baseUrl);
  }
}
