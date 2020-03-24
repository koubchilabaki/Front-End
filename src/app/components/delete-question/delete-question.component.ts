import { Component, OnInit, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/quesion';
import { QuestionService } from 'src/app/services/question.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.css']
})
export class DeleteQuestionComponent implements OnInit {

  question : Question;
  event: EventEmitter<any> = new EventEmitter();
  constructor(private bsModalRef: BsModalRef, private questionService: QuestionService) { }
  
  deleteQuestion(question : Question) {
    this.questionService.deleteQuestion(question).subscribe((data) => {
    console.log('HANDLED', data);
    if (data != null) {
      this.event.emit(data);
      this.bsModalRef.hide();
    }
    },(error) => {
      console.log("Error while getting qualificatif data ", error);
    });
    
  }

  onClose() {
    this.bsModalRef.hide();

  }
  ngOnInit(): void {
  }

}
