import { Enseignant } from './enseignant';
import {RubriqueQuestion} from "./rubrique-question.model";

export class Rubrique {
    idRubrique:number;
    designation:string;
    ordre:number;
    type:string;
    enseignantt:Enseignant;
    rubriqueQuestions: RubriqueQuestion[];
}
