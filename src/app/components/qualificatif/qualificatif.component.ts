import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Qualificatif } from 'src/app/models/qualificatif';
import { SectionComponent } from '../section/section.component';
import { Router } from '@angular/router';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { AddQualificatifComponent } from '../add-qualificatif/add-qualificatif.component';
import { EditQualificatifComponent } from '../edit-qualificatif/edit-qualificatif.component';
import { DeleteQualificatifComponent } from '../delete-qualificatif/delete-qualificatif.component';

@Component({
  selector: 'app-qualificatif',
  templateUrl: './qualificatif.component.html',
  styleUrls: ['./qualificatif.component.css']
})
export class QualificatifComponent implements OnInit {


  qualificatifs: Qualificatif[];
  bsModalRef: BsModalRef;
  constructor(private router: Router
    ,private qualificatifService: QualificatifService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

    ngOnInit() {
      this.qualificatifService.findAll().subscribe((qualificatifs)=>{
        this.qualificatifs = qualificatifs;
      },(error)=>{
        console.log('Error while getting qualificatifs data ',error);
      });
    }
    getQualificatifs() {
      this.qualificatifService.findAll().subscribe(data => {
        this.qualificatifs = data;
        // Object.assign(this.qualificatifs, data);
      }, error => {
        console.log('Error while getting qualificatifs data 2', error);
      });
    }
    addNewQualificatif() {

      this.bsModalRef = this.bsModalService.show(AddQualificatifComponent);
      this.bsModalRef.content.event.subscribe(result => {
        console.log('result :' + result);
        if (result == 'OK') {
          this.getQualificatifs();
        }
      });
    }


    editQualificatif(qualificatif: Qualificatif) {
      this.qualificatifService.changeQualificatifId(qualificatif);
      this.bsModalRef = this.bsModalService.show(EditQualificatifComponent);
      this.bsModalRef.content.event.subscribe(result => {
        if (result == 'OK') {
          this.getQualificatifs();
        }
      });
    }
  
    deleteQualificatif(qualificatif: Qualificatif) {
      this.bsModalRef = this.bsModalService.show(DeleteQualificatifComponent);
      this.bsModalRef.content.qualificatif = qualificatif;
      this.bsModalRef.content.event.subscribe(result => {
        console.log("deleted", result);
        if (result == 'OK') {
          this.qualificatifs=[];
          this.getQualificatifs();
        }
      });
    }


/*---*/

}
