import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import { Qualificatif } from 'src/app/models/qualificatif';
import { SectionComponent } from '../section/section.component';
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

  displayedColumns: string[] = ['minimal', 'maximal', 'actions'];
  dataSource: MatTableDataSource<Qualificatif>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router
    ,private qualificatifService: QualificatifService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

    ngOnInit() {
      this.getQualificatifs();
      this.paginator._intl.itemsPerPageLabel = 'Enregistrements par page:';
    }
    getQualificatifs() {
      this.qualificatifService.findAll().subscribe(data => {
        this.qualificatifs = data;;

        this.dataSource = new MatTableDataSource(this.qualificatifs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
