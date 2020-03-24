import {Component, OnInit, ViewChild} from '@angular/core';
import { Promotion } from 'src/app/models/promotion';
import {ActivatedRoute, Router} from '@angular/router';
import { PromotionService } from 'src/app/services/promotion.service';
import { SectionComponent } from '../section/section.component';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {MatTableDataSource} from '@angular/material/table';
import {Qualificatif} from '../../models/qualificatif';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotions: Promotion[];
  codeFormation:any;
  displayedColumns: string[] = ['anneeUniversitaire', 'siglePromotion', 'etudiants'];
  dataSource: MatTableDataSource<Promotion>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute
    ,private promotionService: PromotionService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }


  ngOnInit(): void {
     this.codeFormation = this.route.snapshot.paramMap.get('codeFormation');
     //this.paginator._intl.itemsPerPageLabel = 'Enregistrements par page:';
    this.getPromotions(this.codeFormation);
  }

  getPromotions(codeFormation:string) {
    this.promotionService.getPromotion(codeFormation).subscribe(data => {
      this.promotions = data;
      console.log(codeFormation);
      console.log(data);
      this.dataSource = new MatTableDataSource(this.promotions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log('Error while getting questions data ', error);
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
