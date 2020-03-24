import { Component, OnInit,ViewChild } from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { Question } from 'src/app/models/quesion';
import { QuestionService } from 'src/app/services/question.service';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
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

  message:string = "";
  showModalMessage:boolean;
  questions:Question[];
  bsModalRef: BsModalRef;
  question: Question;

  displayedColumns: string[] = ['intitule', 'minimal', 'maximal','actions'];
  dataSource: MatTableDataSource<Question>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router
              ,private questionService:QuestionService
              ,private secComp: SectionComponent
              ,private bsModalService: BsModalService) {}

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.findAll().subscribe(data => {
      this.questions = data;
      this.dataSource = new MatTableDataSource(this.questions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log("Error while getting questions data ", error);
    });
  }

  addNewQuestion() {
    this.bsModalRef = this.bsModalService.show(AddQuestionComponent);
    this.bsModalRef.content.event.subscribe(result => {
      console.log('result :'+result);
      this.message = result;
      this.showModalMessage = true;
      this.getQuestions();
    });
  }

  deleteQuestion(question: Question) {
    this.bsModalRef = this.bsModalService.show(DeleteQuestionComponent);
    this.bsModalRef.content.question = question;
    this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      this.message = result;
      this.showModalMessage = true;
      this.getQuestions();
    });
  }
 
  editQuestion(question: Question) {
    console.log("editQuestion ");
    this.questionService.changeQuestionId(question);

    this.bsModalRef = this.bsModalService.show(EditQuestionComponent);
    this.bsModalRef.content.event.subscribe(result => {
      this.message = result;
      this.showModalMessage = true;
      this.getQuestions();
    });
  }
  onClose(){
    this.bsModalRef.hide();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
/*---*/
}
