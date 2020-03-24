import {Component, OnInit, ViewChild} from '@angular/core';
import {Formation} from '../../models/formation';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {QualificatifService} from '../../services/qualificatif.service';
import {SectionComponent} from '../section/section.component';
import {FormationService} from '../../services/formation.service';
import {MatTableDataSource} from '@angular/material/table';
import {Etudiant} from '../../models/etudiant';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formations: Formation[];
  bsModalRef: BsModalRef;
  displayedColumns: string[] = ['codeFormation', 'nomFormation', 'promotions'];
  dataSource: MatTableDataSource<Formation>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private router: Router
    ,private formationService: FormationService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Enregistrements par page:';
    this.getFormations();
  }

  getFormations() {
    this.formationService.findAll().subscribe(formations => {
      this.formations = formations;
      this.dataSource = new MatTableDataSource(this.formations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log('Error while getting formations data ', error);
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
