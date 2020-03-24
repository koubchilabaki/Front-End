import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RubriqueService} from "../../services/rubrique.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {RubriqueQuestion} from "../../models/rubrique-question.model";
import {Rubrique} from "../../models/rubriques";

@Component({
  selector: 'app-rubrique-compose',
  templateUrl: './rubrique-compose.component.html',
  styleUrls: ['./rubrique-compose.component.css']
})
export class RubriqueComposeComponent implements OnInit {

  idRubrique: any;

  showModalCreate: boolean;
  rubrique: Rubrique = new Rubrique();

  displayedColumns: string[] = ['intitule', 'minimal', 'maximal'];
  dataSource: MatTableDataSource<RubriqueQuestion> = new MatTableDataSource();

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

  }

  getRubriquesComposeById(idRubrique: number) {
    this.rubriqueService.findRubriqueById(idRubrique).subscribe(data => {
      this.rubrique = data;
      this.dataSource = new MatTableDataSource(this.rubrique.rubriqueQuestions);

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
