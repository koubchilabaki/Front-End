import { Component, OnInit } from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { Question } from 'src/app/models/quesion';
import { QuestionService } from 'src/app/services/question.service';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddQuestionComponent } from '../../components/add-question/add-question.component';
import { EditQuestionComponent } from '../edit-question/edit-question.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions:Question[];
  bsModalRef: BsModalRef;

  constructor(private router: Router
              ,private questionService:QuestionService
              ,private secComp: SectionComponent
              ,private bsModalService: BsModalService) { 
      this.secComp.title="Question Title"
    }

  ngOnInit() {
    this.questionService.findAll().subscribe((questions)=>{
      console.log(questions[0]);
      this.questions = questions;
    },(error)=>{
      console.log(error);
    });
  }

  getQuestions() {
    this.questionService.findAll().subscribe(data => {
      this.questions = data;
      // Object.assign(this.questions, data);
    }, error => {
      console.log("Error while getting questions data ", error);
    });
  }

  addNewQuestion() {
    /*console.log("btn add modal");
    this.bsModalRef = this.bsModalService.show(AddQuestionComponent);
    this.bsModalRef.content.event.subscribe(result => {
      console.log('result :'+result);
      this.getQuestions();
    });*/
    this.bsModalRef = this.bsModalService.show(AddQuestionComponent);
    this.bsModalRef.content.event.subscribe(result => {
      console.log('result :'+result);
      if (result == 'OK') {
        this.getQuestions();
      }
    });

  }

  // editQuestion(question: Question) {
  //   this.questionService.changeQuestionId(question.idQuestion);
  //   this.bsModalRef = this.bsModalService.show(AddQuestionComponent);
  // }

  deleteQuestion(question: Question) {
    this.questionService.delete(question).subscribe((result) => {
      console.log('deleted', result);
      alert(result);
      this.getQuestions();
    });
  }
 
  editQuestion(question: Question) {
    console.log("editQuestion ");
    this.questionService.changeQuestionId(question);

    this.bsModalRef = this.bsModalService.show(EditQuestionComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.getQuestions();
        }, 5000);
      }
    });
  }
  onClose(){
    this.bsModalRef.hide();
  }

  // addNewPost() {
  //   this.bsModalRef = this.bsModalService.show(AddNewPostComponent);
  //   this.bsModalRef.content.event.subscribe(result => {
  //     if (result == 'OK') {
  //       this.getPosts();
  //     }
  //   });
  // }



/*---*/
}
