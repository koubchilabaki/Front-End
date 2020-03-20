import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionComponent} from '../section/section.component';
import {BsModalService} from 'ngx-bootstrap';
import {EtudiantService} from '../../services/etudiant.service';
import {Etudiant} from '../../models/etudiant';
import {MatTableDataSource} from '@angular/material/table';
import {Qualificatif} from '../../models/qualificatif';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
    etudiants: Etudiant[];

  displayedColumns: string[] = ['sexe', 'nom', 'prenom','email','nationalite','universiteOrigine'];
  dataSource: MatTableDataSource<Etudiant>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute
    ,private etudiantService: EtudiantService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

  ngOnInit(): void {
    let codeFormation = this.route.snapshot.paramMap.get('codeFormation');
    let anneeUniversitaire = this.route.snapshot.paramMap.get('anneeUniversitaire');
    this.paginator._intl.itemsPerPageLabel = 'Enregistrements par page:';
    this.getEtudiantsByACodeFormation(anneeUniversitaire, codeFormation);
  }

  getEtudiantsByACodeFormation(annee:string, code:string){
    this.etudiantService.getEtudiantsByACodeFormation(annee , code).subscribe((etudiants)=>{
      this.etudiants = etudiants;

      this.dataSource = new MatTableDataSource(this.etudiants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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