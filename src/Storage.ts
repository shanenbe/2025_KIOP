import {Type} from "./types/Type";
import {LTerm} from "./term/LTerm";

export class Storage {
    terms: LTerm[];

    constructor(terms: LTerm[]) {
        this.terms = terms;
    }

    push(lTerm: LTerm) {
        this.terms.push(lTerm);
    }
}