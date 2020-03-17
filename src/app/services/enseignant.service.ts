import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Enseignant } from '../models/enseignant';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  private baseUrl = environment.baseUrl;
  private headers = new HttpHeaders({'Content-Type':'application/json'});
  private options = { headers: this.headers}

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Enseignant[]> {
    return this.httpClient.get<Enseignant[]>(this.baseUrl+"/questions/enseignants");
  }
}
