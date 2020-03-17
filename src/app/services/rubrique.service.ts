import { Injectable } from '@angular/core';
import { Rubrique } from '../models/rubriques';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RubriqueService {
  
  rubriques:Rubrique[];
  
  baseUrl = environment.baseUrl+"/rubriques";
  headers = new HttpHeaders({'Content-Type':'application/json'});
  private options = { headers: this.headers}

  constructor(private httpClient: HttpClient) { }



  public findAll(): Observable<Rubrique[]> {
    return this.httpClient.get<Rubrique[]>(this.baseUrl);
  }

}
