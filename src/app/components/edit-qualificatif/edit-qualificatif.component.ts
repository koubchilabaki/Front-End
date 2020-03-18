import { Component, OnInit, EventEmitter } from '@angular/core';
import { Qualificatif } from 'src/app/models/qualificatif';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-qualificatif',
  templateUrl: './edit-qualificatif.component.html',
  styleUrls: ['./edit-qualificatif.component.css']
})
export class EditQualificatifComponent implements OnInit {
  editQualificatifForm: FormGroup;
  qualificatifs: Qualificatif[] = [];
  event: EventEmitter<any> = new EventEmitter();
  qualificatif: Qualificatif = new Qualificatif();
  constructor(private builder: FormBuilder, private enseignantService: EnseignantService,private qualificatifService:QualificatifService, private bsModalRef: BsModalRef, private bsModalService:BsModalService) {
    this.editQualificatifForm = this.builder.group({
      qualificatif: new FormControl(null, []),
      minimal: new FormControl('', []),
      maximal: new FormControl(null, []),
    }); 
    this.qualificatifService.findAll().subscribe(data => {
      Object.assign(this.qualificatifs, data);
    }, error => { console.log('Error while gettig data qualificatifs.'); });

    this.qualificatifService.findAll().subscribe(dataEns => {
      Object.assign(this.qualificatifs, dataEns);
    }, error => { console.log('Error while gettig data enseignants.'); });

    this.qualificatifService.qualificatifData.subscribe(data => {
                                    // if (this.postId !== undefined) {
        
          this.qualificatif = data;
          
          if (this.editQualificatifForm!=null && this.qualificatif!=null) {
            this.editQualificatifForm.controls['maximal'].setValue(this.qualificatif.maximal);
            this.editQualificatifForm.controls['minimal'].setValue(this.qualificatif.minimal);
          }
    });
  
  
  
  }

  ngOnInit(): void {
  }

}
