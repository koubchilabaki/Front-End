import { Component, OnInit } from '@angular/core';
import {Formation} from '../../models/formation';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {QualificatifService} from '../../services/qualificatif.service';
import {SectionComponent} from '../section/section.component';
import {FormationService} from '../../services/formation.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formations: Formation[];
  bsModalRef: BsModalRef;
  constructor(private router: Router
    ,private formationService: FormationService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.formationService.findAll().subscribe((formations)=>{
      //console.log(formations[0]);
      this.formations = formations;
    },(error)=>{
      console.log("Errrrrrr: "+this.formations+''+error);
    });
  }

  getFormations() {
    this.formationService.findAll().subscribe(data => {
      this.formations = data;
      // Object.assign(this.qualificatifs, data);
    }, error => {
      console.log('Error while getting formations data ', error);
    });
  }

}
