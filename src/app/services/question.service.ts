import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Question } from '../models/quesion';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl = environment.baseUrl + '/questions';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  private options = { headers: this.headers}
  questionSource = new  BehaviorSubject<Question>(null);
  questionData: any;
  questionSelected: Question;

  constructor(private httpClient: HttpClient) {
    this.questionData= this.questionSource.asObservable();
   }

  public findAll(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.baseUrl);
  }

<<<<<<< HEAD
  addQuestion(question: Question){
    console.log("add question service :"+question.intitule);

    return this.httpClient.post(this.baseUrl,question, {responseType: 'text' });
=======
>>>>>>> 5cd874e7ebcd6c7e4e632f04dd9561a730da3481

  }

<<<<<<< HEAD
  public delete(question: Question): Observable<string> {
    return this.httpClient.post(this.baseUrl + "/deleteQuestion", question, { responseType: 'text' })
  }

  updatePost(question: Question): Observable<string>{
    return this.httpClient.put(this.baseUrl, question, { responseType: 'text' })
  }
  changeQuestionId(questionSelected: Question){
    this.questionSource.next(questionSelected);
  }
=======
>>>>>>> 5cd874e7ebcd6c7e4e632f04dd9561a730da3481

}
