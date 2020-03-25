import {RubriqueQuestionPk} from "./rubrique-question.model";


export class RubriqueQuestions {
  id: RubriqueQuestionPk;
  ordre: number;

  constructor(idRubrique:number,idQuestion:number,ordre:number)
  {
    this.id = new RubriqueQuestionPk();
    this.id.idQuestion=idQuestion;
    this.id.idRubrique=idRubrique;
    this.ordre=ordre;
  }
}