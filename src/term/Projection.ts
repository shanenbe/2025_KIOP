import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Function_Type} from "../types/Function_Type";
import {Number} from "../types/Number";
import {Plus} from "./Plus";
import {Storage} from "../Storage";
import {Minus} from "./Minus";
import {Record} from "./Record";
import {Record_Type} from "../types/Record_Type";

export class Projection extends LTerm {

    term: LTerm;
    label: string;

    constructor(term: LTerm, label: string) {
        super();
        this.term = term;
        this.label = label;
    }

    clone(): LTerm {
        return new Projection(this.term.clone(), this.label);
    }

    free_variables(): string[] {
        return this.term.free_variables();
    }

    is_reducible(): boolean {
        return true;
    }

    reduce(storage: Storage): LTerm {
        if(this.term.is_reducible()) {
            return new Projection(this.term.reduce(storage), this.label);
        }

        let this_record = this.term as Record;

        return this_record.terms[this_record.labels.indexOf(this.label)];
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return new Projection(this.term.replace_free_variable(varname, lTerm), this.label);
    }

    type_of(e: Environment): Type {
        let r_type: Record_Type = this.term.type_of(e) as Record_Type;
        return r_type.types[r_type.labels.indexOf(this.label)];
    }

    equals(term: LTerm): boolean {
        if(!(term instanceof Projection)) {return false}
        return this.term.equals(term.term) && this.label == term.label;
    }

}