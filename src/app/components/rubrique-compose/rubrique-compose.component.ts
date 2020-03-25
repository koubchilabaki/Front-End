import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RubriqueService} from "../../services/rubrique.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {RubriqueQuestion} from "../../models/rubrique-question.model";
import {Rubrique} from "../../models/rubriques";
import { Question } from 'src/app/models/quesion';
import { RubriqueQuestions } from 'src/app/models/rubriqueQuestions';

@Component({
  selector: 'app-rubrique-compose',
  templateUrl: './rubrique-compose.component.html',
  styleUrls: ['./rubrique-compose.component.css']
})
export class RubriqueComposeComponent implements OnInit {

  idRubrique: any;

  showModalCreate: boolean;
  rubrique: Rubrique = new Rubrique();
  questions:Question[] ;
  rubriqueQuestions:RubriqueQuestions[];
  displayedColumns: string[] = ['intitule', 'minimal', 'maximal'];
  dataSource: MatTableDataSource<RubriqueQuestion> = new MatTableDataSource();
  dataSource1: MatTableDataSource<Question> = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private rubriqueService: RubriqueService,
    private router: Router, private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.idRubrique = this.route.snapshot.paramMap.get('idRubrique');
    this.getRubriquesComposeById(this.idRubrique);
    this.getQuestionNonUtilise(this.idRubrique);

  }

  getRubriquesComposeById(idRubrique: number) {
    this.rubriqueService.findRubriqueById(idRubrique).subscribe(data => {
      this.rubrique = data;
      this.dataSource= new MatTableDataSource(this.rubrique.rubriqueQuestions);

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'intitule':
            return item.questionn.intitule;
          case 'minimal':
            return item.questionn.qualificatif.minimal;
          case 'maximal':
            return item.questionn.qualificatif.maximal;
          default:
            return item[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data: RubriqueQuestion, filter) => {
        const dataStr = data.questionn.intitule + data.questionn.qualificatif.minimal + data.questionn.qualificatif.maximal;
        return dataStr.toLowerCase().indexOf(filter) != -1;
      };

      // Object.assign(this.questions, data);
    }, error => {
      console.log("Error while getting questions data ", error);
    });


  }

  getQuestionNonUtilise(idRubrique:number)
  {
    
    this.rubriqueService.findQuestionNonUtilise(idRubrique).subscribe(data => {
      this.questions = data;
      console.log(data);
      this.dataSource1 = new MatTableDataSource(this.questions);

      this.dataSource1.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'intitule':
            return item.intitule;
          case 'minimal':
            return item.qualificatif.minimal;
          case 'maximal':
            return item.qualificatif.maximal;
          default:
            return item[property];
        }
      };

      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;

      this.dataSource1.filterPredicate = (data:Question, filter) => {
        const dataStr = data.intitule + data.qualificatif.minimal + data.qualificatif.maximal;
        return dataStr.toLowerCase().indexOf(filter) != -1;
      };

      // Object.assign(this.questions, data);
    }, error => {
      console.log("Error while getting questions data ", error);
    });
  }
  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  saveRubriqueQuestion()
  {
    this.rubriqueService.updateRubriqueQuestion(this.rubriqueQuestions).subscribe();
    this.rubriqueQuestions= [];
    this.getRubriquesComposeById(this.idRubrique);
    this.getQuestionNonUtilise(this.idRubrique);
    this.showModalCreate=false;
    
  }
 

  Add(idQuestion:number)
  {
    let rq=new  RubriqueQuestions();
    rq.id.idQuestion=idQuestion;
    rq.id.idRubrique=this.idRubrique;
    rq.ordre=this.rubrique.ordre;
    this.rubriqueQuestions.push(rq);
    
  }
  Annuler(){
    this.rubriqueQuestions= [];
    this.showModalCreate=false;

  }
}
