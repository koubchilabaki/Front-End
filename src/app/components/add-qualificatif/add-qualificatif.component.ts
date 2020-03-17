import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Enseignant } from 'src/app/models/enseignant';
import { Qualificatif } from 'src/app/models/qualificatif';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-add-qualificatif',
  templateUrl: './add-qualificatif.component.html',
  styleUrls: ['./add-qualificatif.component.css']
})
export class AddQualificatifComponent implements OnInit {

  addNewqualificatifForm: FormGroup;

  qualificatif: Qualificatif = new Qualificatif();
  event: EventEmitter<any> = new EventEmitter();

  constructor(private builder: FormBuilder, private qualificatifService: QualificatifService, private bsModalRef: BsModalRef) {
    this.addNewqualificatifForm = this.builder.group({
      minimal: new FormControl('', []),
      maximal: new FormControl(null, []),
    });

  }
  
  onQualificatifFormSubmit() {

    this.qualificatifService.addQualificatif(this.qualificatif).subscribe((data) => {
      console.log('HANDLED', data);
      alert(data);
      if (data != null) {
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    },(error) => {
      console.log("Error while getting qualificatifs data ", error);
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }


  ngOnInit(): void {
  }

}
