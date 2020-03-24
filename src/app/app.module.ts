import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionComponent } from './components/section/section.component';
import { QuestionComponent } from './components/question/question.component';
import { QualificatifComponent } from './components/qualificatif/qualificatif.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { QuestionService } from './services/question.service';
import { HttpClientModule } from '@angular/common/http';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { AddQualificatifComponent } from './components/add-qualificatif/add-qualificatif.component';
import { EditQualificatifComponent } from './components/edit-qualificatif/edit-qualificatif.component';
import { RubriquesComponent } from './components/rubriques/rubriques.component';
import {Qualificatif} from './models/qualificatif';
import {FormationComponent} from './components/formation/formation.component';
import { DeleteQualificatifComponent } from './components/delete-qualificatif/delete-qualificatif.component';
import { DeleteQuestionComponent } from './components/delete-question/delete-question.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import { RubriqueComposeComponent } from './components/rubrique-compose/rubrique-compose.component';
import { ListRubriqueComposeComponent } from './components/list-rubrique-compose/list-rubrique-compose.component';

 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SectionComponent,
    QuestionComponent,
    QualificatifComponent,
    PromotionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    AddQualificatifComponent,
    EditQualificatifComponent,
    RubriquesComponent,
    FormationComponent,
    DeleteQualificatifComponent,
    DeleteQuestionComponent,
    EtudiantComponent,
    RubriqueComposeComponent,
    ListRubriqueComposeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [

  ],
  providers: [QuestionService, SectionComponent],
  bootstrap: [AppComponent],
  entryComponents: [AddQuestionComponent]
})
export class AppModule { }
