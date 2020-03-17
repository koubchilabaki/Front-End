import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/quesion';
import { Rubrique } from 'src/app/models/rubriques';
import { SectionComponent } from '../section/section.component';
import { RubriqueService } from 'src/app/services/rubrique.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';

@Component({
  selector: 'app-rubriques',
  templateUrl: './rubriques.component.html',
  styleUrls: ['./rubriques.component.css']
})
export class RubriquesComponent implements OnInit {


  rubriques:Rubrique[];

  constructor(private router: Router
    ,private rubriqueService:RubriqueService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

    getRubriques() {
      this.rubriqueService.findAll().subscribe(data => {
        this.rubriques = data;
        // Object.assign(this.questions, data);
      }, error => {
        console.log("Error while getting questions data ", error);
      });
    }


  ngOnInit(): void {

    this.rubriqueService.findAll().subscribe((rubriques)=>{
      console.log(rubriques[0]);
      this.rubriques = rubriques;
    },(error)=>{
      console.log(error);
    });
  }

}
