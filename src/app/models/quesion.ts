import { Enseignant } from './enseignant';
import {Qualificatif} from './qualificatif';

export class Question {
    idQuestion: number;
    intitule: string;
    type: string;
    enseignant: Enseignant;
    qualificatif: Qualificatif;
}
