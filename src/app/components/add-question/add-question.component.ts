import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Qualificatif } from 'src/app/models/qualificatif';
import { Enseignant } from 'src/app/models/enseignant';
import { Question } from 'src/app/models/quesion';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  addNewQuestionForm: FormGroup;
  qualificatifs: Qualificatif[] = [];
  enseignants: Enseignant[] = [];
  question: Question = new Question();
  typeQuestion: String = "QUS"

  event: EventEmitter<any> = new EventEmitter();
  constructor(private builder: FormBuilder, private questionService: QuestionService, private enseignantService: EnseignantService, private qualificatifService: QualificatifService, private bsModalRef: BsModalRef) {
    this.addNewQuestionForm = this.builder.group({
      intitule: new FormControl('', []),
      qualificatif: new FormControl(null, []),
    });

    this.qualificatifService.findAll().subscribe(data => {
      Object.assign(this.qualificatifs, data);
    }, error => { console.log('Error while gettig data qualificatifs.'); });

  }

  onQuestionFormSubmit() {

    this.questionService.addQuestion(this.question).subscribe((data) => {
      console.log('HANDLED', data);
      if (data != null) {
        this.event.emit(data);
        this.bsModalRef.hide();
      }
    },(error) => {
      console.log("Error while getting questions data ", error);
    });
  }



  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit(): void {
  }

}
