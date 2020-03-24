import {Question} from "./quesion";

export class RubriqueQuestionPk {
  idRubrique: number;
  idQuestion: number;
}

export class RubriqueQuestion {
  id: RubriqueQuestionPk;
  ordre: number;
  questionn: Question;
}
