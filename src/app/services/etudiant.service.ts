import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { range } from 'rxjs';
import { Etudiant } from '../models/etudiant';
import {Promotion} from '../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  baseUrl = environment.baseUrl + '/etudiants';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  private options = { headers: this.headers}
  etudiantSource = new  BehaviorSubject<Etudiant>(null);
  etudiantData: any;
  etudiantSelected: Etudiant;

  constructor(private httpClient: HttpClient) {
    this.etudiantData= this.etudiantSource.asObservable();
   }

  public findAll(): Observable<Etudiant[]> {
    return this.httpClient.get<Etudiant[]>(this.baseUrl);
  }

  public getEtudiantsByACodeFormation(anneeUniversitaire: string, codeFormation:string): Observable<Etudiant[]>{
    return this.httpClient.get<Etudiant[]>(`${this.baseUrl}/${anneeUniversitaire}/${codeFormation}`);
  }
  addEtudiant(etudiant: Etudiant){
    return this.httpClient.post(this.baseUrl,etudiant, {responseType: 'text' });
  }

  public delete(etudiant: Etudiant): Observable<string> {
    return this.httpClient.post(this.baseUrl + "/deleteEtudiant", etudiant, { responseType: 'text' })
  }

  updateEtudiant(etudiant: Etudiant): Observable<string>{
    return this.httpClient.put(this.baseUrl, etudiant, { responseType: 'text' })
  }

  changeEtudiantId(etudiantSelected: Etudiant){
    this.etudiantSource.next(etudiantSelected);
  }
}
