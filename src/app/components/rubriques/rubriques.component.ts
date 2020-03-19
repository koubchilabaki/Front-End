import {Component, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/app/models/quesion';
import { Rubrique } from 'src/app/models/rubriques';
import { SectionComponent } from '../section/section.component';
import { RubriqueService } from 'src/app/services/rubrique.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
@Component({
  selector: 'app-rubriques',
  templateUrl: './rubriques.component.html',
  styleUrls: ['./rubriques.component.css']
})
export class RubriquesComponent implements OnInit {

  
  message:any = "";

  IdRubriqueSupprimer:number;
  rubriqueEdit:Rubrique = new Rubrique();
  rubriqueCreate:Rubrique = new Rubrique();
  rubriques:Rubrique[];
  
  showModalCreate:boolean;
  showModalEdit:boolean;
  showModalMessage:boolean;
  showModalConfirmation:boolean;

  displayedColumns: string[] = ['designation', 'ordre', 'actions'];
  dataSource: MatTableDataSource<Rubrique>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router,
    private rubriqueService:RubriqueService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) {
  }

    getRubriques() {
      this.rubriqueService.findAll().subscribe(data => {
        this.rubriques = data.sort ((a,b) => {

          if(a.ordre < b.ordre)
          {
            return -1;
          }
          else
          {
            return 1 ;
          }
        });

        this.dataSource = new MatTableDataSource(this.rubriques);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Object.assign(this.questions, data);
      }, error => {
        console.log("Error while getting questions data ", error);
      });
     
      
    }


  ngOnInit(): void {

    this.getRubriques();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ajouterRubrique() {
    this.rubriqueService.create(this.rubriqueCreate).subscribe(message => {
      console.log(message);
      this.showModalCreate = false;
      this.rubriqueCreate = new Rubrique();
      this.getRubriques();

    });

  }


  showModifierRubrique(id: number) {
    this.rubriqueEdit = this.rubriques.find(rubrique => rubrique.idRubrique == id);
    this.showModalEdit = true;
    this.getRubriques();
  }

  ModifierRubrique() {
    this.rubriqueService.update(this.rubriqueEdit).subscribe(message => {
      this.showModalEdit = false;
      this.rubriqueEdit = new Rubrique();
      this.getRubriques();

    }, error1 => {
      this.showModalEdit = false;
      this.rubriqueEdit = new Rubrique();
      this.showModalMessage = true;
      this.message = error1.error;
    });
  }

  ShowSurpprimerRubrique(id: number) {
    var designation = this.rubriques.find(rubrique => rubrique.idRubrique == id).designation;
    this.IdRubriqueSupprimer = id;
    this.message = "Êtes-vous sûr de vouloir supprimer la rubrique " + designation;
    this.showModalConfirmation = true;
  }

  SupprimerRubrique() {
    this.showModalConfirmation = false;
    this.rubriqueService.delete(this.IdRubriqueSupprimer).subscribe(message => {
      this.message = message;
      this.showModalMessage = true;
      this.IdRubriqueSupprimer = null;
      this.getRubriques();
    }, error1 => {
      this.message = error1.error;
      this.showModalMessage = true;
      this.IdRubriqueSupprimer = null;
    });
  }
  
}
