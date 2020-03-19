import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { QualificatifService } from 'src/app/services/qualificatif.service';
import { Qualificatif } from 'src/app/models/qualificatif';

@Component({
  selector: 'app-delete-qualificatif',
  templateUrl: './delete-qualificatif.component.html',
  styleUrls: ['./delete-qualificatif.component.css']
})
export class DeleteQualificatifComponent implements OnInit {

  qualificatif : Qualificatif;
  event: EventEmitter<any> = new EventEmitter();
  constructor(private bsModalRef: BsModalRef, private qualificatifService: QualificatifService) { }
  
  deleteQualificatif(qualificatif: Qualificatif) {
    this.qualificatifService.deleteQualificatif(qualificatif).subscribe((data) => {
    console.log('HANDLED', data);
    alert(data);
    if (data != null) {
      this.event.emit('OK');
      this.bsModalRef.hide();
    }
    },(error) => {
      console.log("Error while getting qualificatif data ", error);
    });
    
  }

  onClose() {
    this.bsModalRef.hide();

  }
  ngOnInit(): void {
  }

}
