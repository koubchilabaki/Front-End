import { Component, OnInit } from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { Question } from 'src/app/models/quesion';
import { QuestionService } from 'src/app/services/question.service';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddQuestionComponent } from '../../components/add-question/add-question.component';
import { EditQuestionComponent } from '../edit-question/edit-question.component';
import { DeleteQuestionComponent } from '../delete-question/delete-question.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions:Question[];
  bsModalRef: BsModalRef;
  question: Question;

  constructor(private router: Router
              ,private questionService:QuestionService
              ,private secComp: SectionComponent
              ,private bsModalService: BsModalService) {}

  ngOnInit() {
    this.questionService.findAll().subscribe((questions)=>{
      this.questions = questions;
    },(error)=>{
      console.log(error);
    });
  }

  getQuestions() {
    this.questionService.findAll().subscribe(data => {
      this.questions = data;
    }, error => {
      console.log("Error while getting questions data ", error);
    });
  }

  addNewQuestion() {
    this.bsModalRef = this.bsModalService.show(AddQuestionComponent);
    this.bsModalRef.content.event.subscribe(result => {
      console.log('result :'+result);
      if (result == 'OK') {
        this.getQuestions();
      }
    });

  }

  deleteQuestion(question: Question) {
    this.bsModalRef = this.bsModalService.show(DeleteQuestionComponent);
    this.bsModalRef.content.question = question;
    this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      if (result == 'OK') {
        // this.questions=[];
        this.getQuestions();
      }
    });
  }
 
  editQuestion(question: Question) {
    console.log("editQuestion ");
    this.questionService.changeQuestionId(question);

    this.bsModalRef = this.bsModalService.show(EditQuestionComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.getQuestions();
      }
    });
  }
  onClose(){
    this.bsModalRef.hide();
  }

/*---*/
}
