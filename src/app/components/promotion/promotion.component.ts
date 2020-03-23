import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion';
import {ActivatedRoute, Router} from '@angular/router';
import { PromotionService } from 'src/app/services/promotion.service';
import { SectionComponent } from '../section/section.component';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotions: Promotion[];
  codeFormation:any;
  constructor(private router: Router, private route: ActivatedRoute
    ,private promotionService: PromotionService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

    getPromotions() {
      this.promotionService.findAll().subscribe(data => {
        this.promotions = data;
        console.log(data);
         Object.assign(this.promotions, data);
      }, error => {
        console.log('Error while getting questions data ', error);
      });
    }


  ngOnInit(): void {
     this.codeFormation = this.route.snapshot.paramMap.get('codeFormation');
    this.promotionService.getPromotion(this.codeFormation).subscribe((promotions)=>{
      this.promotions = promotions;
    }, (error) => {
      console.log(error);
    });
  }

}
