import { Injectable } from '@angular/core';
import { Rubrique } from '../models/rubriques';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Etudiant} from "../models/etudiant";
import { Question } from '../models/quesion';
import { RubriqueQuestions } from 'src/app/models/rubriqueQuestions';

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
  public create(rubrique:Rubrique): Observable<any>
  { 
    rubrique.idRubrique=22;
    rubrique.type="RBS";
    rubrique.enseignantt=null;
    console.log(rubrique);
    return this.httpClient.post(this.baseUrl+"/CreateRubrique", rubrique,{responseType: 'text' });

  } 

  public delete(id:number){

    return this.httpClient.delete(this.baseUrl+"/deleteRubrique-"+id,{responseType: 'text' });
  }
  public update(rubrique:Rubrique){
   
    console.log(rubrique);
    return this.httpClient.put(this.baseUrl+"/updateRubrique", rubrique,{responseType: 'text' });
  }


  public findRubriqueById(idRubrique : number): Observable<Rubrique>{

    return this.httpClient.get<Rubrique>(`${this.baseUrl}/${idRubrique}`);
  }
  public findQuestionNonUtilise(idRubrique:number):Observable<Question[]>
  {
    return this.httpClient.get<Question[]>(this.baseUrl+"/QuestionNonUtiliseDansrubrique-"+idRubrique)
  }
  public updateRubriqueQuestion(rubriqueQuestions:RubriqueQuestions[]){
    console.log("udpate");
    return this.httpClient.put(this.baseUrl+"/updateRubriqueQuestion", rubriqueQuestions,{responseType: 'text' });
  }
  public deleteRubriqueQuestion(rubriqueQuestion:RubriqueQuestions){

    return this.httpClient.post(this.baseUrl+"/deleteRubriqueQuestion",rubriqueQuestion,{responseType: 'text' });
  }
  
  


  }


