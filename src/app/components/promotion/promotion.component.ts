import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion';
import { Router } from '@angular/router';
import { PromotionService } from 'src/app/services/promotion.service';
import { SectionComponent } from '../section/section.component';
<<<<<<< HEAD
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
=======
>>>>>>> 5cd874e7ebcd6c7e4e632f04dd9561a730da3481

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotions: Promotion[];

  constructor(private router: Router
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

    this.promotionService.findAll().subscribe((promotions)=>{
      console.log(promotions[0]);
      this.promotions = promotions;
    }, (error) => {
      console.log(error);
    });
  }

}
