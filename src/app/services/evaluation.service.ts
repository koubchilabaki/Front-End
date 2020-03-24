import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import {Evaluation} from '../models/evaluation';


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  baseUrl = environment.baseUrl + '/evaluations/findByAnneeCode';
  host = 'http://localhost:9090/findByAnneeCodeFormation/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  private options = { headers: this.headers}
  evaluationSource = new  BehaviorSubject<Evaluation>(null);
  evaluationData: any;

  constructor( private httpClient: HttpClient) {
    this.evaluationData= this.evaluationSource.asObservable();
  }

  public findAll(): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(this.baseUrl);
  }

  public getEvaluationsByACodeFormation(anneeUniversitaire: string, codeFormation:string): Observable<Evaluation[]>{
   // return this.httpClient.get<Evaluation[]>(`${this.baseUrl}/${anneeUniversitaire}/${codeFormation}`);
    return this.httpClient.get<Evaluation[]>(this.host+anneeUniversitaire+"/"+codeFormation);
  }
}
