import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { QualificatifComponent } from './components/qualificatif/qualificatif.component';
import { QuestionComponent } from './components/question/question.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { RubriquesComponent } from './components/rubriques/rubriques.component';
import {FormationComponent} from './components/formation/formation.component';
import {EtudiantComponent} from './components/etudiant/etudiant.component';
import {EvaluationComponent} from './components/evaluation/evaluation.component';
import {RubriqueComposeComponent} from "./components/rubrique-compose/rubrique-compose.component";


const routes: Routes = [

  //le composant qui s'affiche par défaut c'est la page d'acceuil
  {path: '', component: AcceuilComponent},
  {path: 'qualificatifs', component: QualificatifComponent},
  {path: 'questions', component: QuestionComponent},
  {path: 'rubrique', component: RubriquesComponent},//RubriquesComponent
  {path: 'promotions/:codeFormation', component: PromotionComponent},
  {path: 'etudiants/:anneeUniversitaire/:codeFormation', component: EtudiantComponent},
  {path: 'evaluations/:anneeUniversitaire/:codeFormation', component: EvaluationComponent},
  {path: 'formations', component: FormationComponent},
  {path: 'rubriqueCompose', component: RubriqueComposeComponent},
  {path: 'rubriqueCompose/:idRubrique', component: RubriqueComposeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //pour importer le module
  exports: [RouterModule]
})
export class AppRoutingModule { }
