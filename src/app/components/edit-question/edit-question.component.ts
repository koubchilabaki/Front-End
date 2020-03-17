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
  enseignants: Enseignant[] = [];
  question: Question = new Question();
  typeQuestion: String = "QUS"
  constructor(private builder: FormBuilder,private questionService: QuestionService, private enseignantService: EnseignantService,private qualificatifService:QualificatifService, private bsModalRef: BsModalRef, private bsModalService:BsModalService) {
          this.editQuestionForm = this.builder.group({
            intitule: new FormControl('', []),
            qualificatif: new FormControl(null, []),
            enseignant: new FormControl('', []),
            type: new FormControl('', [])
          });

                this.qualificatifService.findAll().subscribe(data => {
                  Object.assign(this.qualificatifs, data);
                }, error => { console.log('Error while gettig data qualificatifs.'); });

                this.enseignantService.findAll().subscribe(dataEns => {
                  Object.assign(this.enseignants, dataEns);
                }, error => { console.log('Error while gettig data enseignants.'); });

                this.questionService.questionData.subscribe(data => {
                                                // if (this.postId !== undefined) {
                    
                      this.question = data;
                      
                      if (this.editQuestionForm!=null && this.question!=null) {
                        this.editQuestionForm.controls['intitule'].setValue(this.question.intitule);
                        this.editQuestionForm.controls['qualificatif'].setValue(this.question.qualificatif.idQualificatif);
                        this.editQuestionForm.controls['enseignant'].setValue(this.question.enseignant.noEnseignant);
                        this.editQuestionForm.controls['type'].setValue(this.question.type);
                      }
                });
   }

   


/*


  event: EventEmitter<any> = new EventEmitter();
  constructor(private builder: FormBuilder, private questionService: QuestionService, private enseignantService: EnseignantService, private qualificatifService: QualificatifService, private bsModalRef: BsModalRef) {
   

*/
  ngOnInit(): void {
  }

}
