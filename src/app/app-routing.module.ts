import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { QualificatifComponent } from './components/qualificatif/qualificatif.component';
import { QuestionComponent } from './components/question/question.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { RubriquesComponent } from './components/rubriques/rubriques.component';
import {FormationComponent} from './components/formation/formation.component';


const routes: Routes = [

  {path: '', component: AcceuilComponent},
  {path: 'qualificatifs', component: QualificatifComponent},
  {path: 'questions', component: QuestionComponent},
  {path: 'rubrique', component: RubriquesComponent},//RubriquesComponent
  {path: 'promotions/:codeFormation', component: PromotionComponent},
  {path: 'formations', component: FormationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
