import { Component, OnInit, EventEmitter } from '@angular/core';
import { Qualificatif } from 'src/app/models/qualificatif';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { Question } from 'src/app/models/quesion';
import { Enseignant } from 'src/app/models/enseignant';
import { QuestionService } from 'src/app/services/question.service';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  editQuestionForm: FormGroup;
  qualificatifs: Qualificatif[] = [];
  event: EventEmitter<any> = new EventEmitter();
  question: Question;
  idQualificatif : number;

  constructor(private builder: FormBuilder,private questionService: QuestionService, private qualificatifService:QualificatifService, private bsModalRef: BsModalRef, private bsModalService:BsModalService) {
          this.editQuestionForm = this.builder.group({
            intitule: new FormControl('', []),
            qualificatif: new FormControl(null, []),
          });

          this.qualificatifService.findAll().subscribe(data => {
            this.qualificatifs = data;
          }, error => { console.log('Error while gettig data qualificatifs.'); });


          this.questionService.questionData.subscribe(data => {
            this.question = data;
            if (this.editQuestionForm!=null && this.question!=null) {
              this.editQuestionForm.controls['intitule'].setValue(this.question.intitule);
              this.editQuestionForm.controls['qualificatif'].setValue(this.question.qualificatif);
            }
          });
   }

   onQuestionEditFormSubmit() {
    this.questionService.updateQuestion(this.question).subscribe((data) => {
      console.log('HANDLED', data);
      if (data != null) {
        this.event.emit(data);
        this.bsModalRef.hide();
      }
    },(error) => {
      console.log("Error while getting question data ", error);
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }
  
  ngOnInit(): void {
  }

}
