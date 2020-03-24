import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionComponent} from '../section/section.component';
import {BsModalService} from 'ngx-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EvaluationService} from '../../services/evaluation.service';
import {Evaluation} from '../../models/evaluation';


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluations: Evaluation[];
  codeFormation:any;
  anneeUniversitaire:any;
  displayedColumns: string[] = ['designation', 'etat','periode'];
  dataSource: MatTableDataSource<Evaluation>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute
    ,private evaluationService: EvaluationService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

  ngOnInit(): void {
     this.codeFormation = this.route.snapshot.paramMap.get('codeFormation');
    this.anneeUniversitaire = this.route.snapshot.paramMap.get('anneeUniversitaire');
    this.paginator._intl.itemsPerPageLabel = 'Enregistrements par page:';
    this.getEvaluationsByACodeFormation(this.anneeUniversitaire, this.codeFormation);
  }

  getEvaluationsByACodeFormation(annee:string, code:string){
    this.evaluationService.getEvaluationsByACodeFormation(annee , code).subscribe((evaluations)=>{
      this.evaluations = evaluations;

      this.dataSource = new MatTableDataSource(this.evaluations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.evaluations);
    }, (error) => {
      console.log(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
