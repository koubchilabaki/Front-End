import { Component, OnInit, EventEmitter } from '@angular/core';
import { Qualificatif } from 'src/app/models/qualificatif';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-qualificatif',
  templateUrl: './edit-qualificatif.component.html',
  styleUrls: ['./edit-qualificatif.component.css']
})
export class EditQualificatifComponent implements OnInit {
  editQualificatifForm: FormGroup;
  qualificatif : Qualificatif;
  event: EventEmitter<any> = new EventEmitter();
  // qualificatif: Qualificatif = new Qualificatif();

  //constructeur
  constructor(private builder: FormBuilder, private qualificatifService:QualificatifService, private bsModalRef: BsModalRef, private bsModalService:BsModalService) {
    this.editQualificatifForm = this.builder.group({
      minimal: new FormControl('', []),
      maximal: new FormControl('', []),
    }); 
   this.qualificatifService.qualificatifData.subscribe(data => {
          this.qualificatif = data;
            this.editQualificatifForm.controls['maximal'].setValue(data.maximal);
            this.editQualificatifForm.controls['minimal'].setValue(data.minimal);
    });
  }
  onEditQualificatifFormSubmit() {

    this.qualificatif.minimal= this.editQualificatifForm.get('minimal').value;
    this.qualificatif.maximal= this.editQualificatifForm.get('maximal').value;

    this.qualificatifService.updateQualificatif(this.qualificatif).subscribe((data) => {
      console.log('HANDLED', data);
      if (data != null) {
        this.event.emit(data);
        this.bsModalRef.hide();
      }
    },(error) => {
      console.log("Error while getting qualificatifs data ", error);
    });
  }
  testQualificatif(qualificatif: Qualificatif) {
    console.log(qualificatif);
  }
  /*
    onPostEditFormSubmit() {
    let postData = {
      'PostId': this.postId,
      'Title': this.editPostForm.get('title').value,
      'Description': this.editPostForm.get('description').value,
      'CategoryId': this.editPostForm.get('category').value,
    };

    this.blogService.updatePost(postData).subscribe(data => {      
        this.event.emit('OK');
        this.bsModalRef.hide();      
    });
  }
  
  
  */
  ngOnInit(): void {
  }
  // fermer le modal de modification
  onClose() {
    this.bsModalRef.hide();

  }
}
