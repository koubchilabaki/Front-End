import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionComponent} from '../section/section.component';
import {BsModalService} from 'ngx-bootstrap';
import {EtudiantService} from '../../services/etudiant.service';
import {Etudiant} from '../../models/etudiant';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
    etudiants: Etudiant[];
  constructor(private router: Router, private route: ActivatedRoute
    ,private etudiantService: EtudiantService
    ,private secComp: SectionComponent
    ,private bsModalService: BsModalService) { }

  ngOnInit(): void {
    let codeFormation = this.route.snapshot.paramMap.get('codeFormation');
    let anneeUniversitaire = this.route.snapshot.paramMap.get('anneeUniversitaire');
    this.etudiantService.getEtudiantsByACodeFormation(anneeUniversitaire,codeFormation).subscribe((etudiants)=>{
      this.etudiants = etudiants;
    }, (error) => {
      console.log(error);
    });
  }

}
