import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router'; 
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionComponent } from './components/section/section.component';
import { QuestionComponent } from './components/question/question.component';
import { QualificatifComponent } from './components/qualificatif/qualificatif.component';
import { RubriqueComponent } from './components/rubrique/rubrique.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { QuestionService } from './services/question.service';
import { HttpClientModule } from '@angular/common/http';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { AddQualificatifComponent } from './components/add-qualificatif/add-qualificatif.component';
import { EditQualificatifComponent } from './components/edit-qualificatif/edit-qualificatif.component';
import { RubriquesComponent } from './components/rubriques/rubriques.component';


 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SectionComponent,
    QuestionComponent,
    QualificatifComponent,
    RubriqueComponent,
    PromotionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    AddQualificatifComponent,
    EditQualificatifComponent,
    RubriquesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
      
  ],
  providers: [QuestionService,SectionComponent],
  bootstrap: [AppComponent],
  entryComponents:[AddQuestionComponent]
})
export class AppModule { }
