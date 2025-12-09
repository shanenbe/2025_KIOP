import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Function_Type} from "../types/Function_Type";
import {Number} from "../types/Number";
import {Storage} from "../Storage";
import {Plus} from "./Plus";
import {Record_Type} from "../types/Record_Type";

export class Record extends LTerm {

    to_string(): string {
        let ret = [];
        for (let i = 0; i < this.labels.length; i++) {
            ret.push(this.labels[i] + ":" + this.terms[i].to_string());
        }
        return "{" + ret.join(",") + "}";
    }

    labels: string[];
    terms: LTerm[];

    constructor(labels: string[], terms: LTerm[]) {
        super();
        this.labels = labels;
        this.terms = terms;
    }

    clone(): LTerm {
        let label_clone = [];
        for (let c of this.labels) {
            label_clone.push(c);
        }

        let terms_clone = [];
        for (let c of this.terms) {
            terms_clone.push(c.clone());
        }

        return new Record(label_clone, terms_clone);

    }

    free_variables(): string[] {
        let free_variables = [];
        for (let c of this.terms) {
            free_variables.push(...c.free_variables());
        }
        return free_variables;
    }

    is_reducible(): boolean {
        for (let c of this.terms) {
            if(c.is_reducible()) return true;
        }
        return false;
    }

    reduce(storage: Storage): LTerm {

        let label_clone = [];
        let terms_clone = [];

        let reduce_flag = false;

        for(let i=0; i<this.terms.length; i++) {
            label_clone.push(this.labels[i]);
            if(this.terms[i].is_reducible() && reduce_flag == false) {
                terms_clone.push(this.terms[i].reduce(storage));
                reduce_flag = true;
            } else {
                terms_clone.push(this.terms[i].clone());
            }
        }

        return new Record(label_clone, terms_clone);
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {

        let terms_clone = [];
        let label_clone = [];

        for(let i=0; i<this.terms.length; i++) {
            label_clone.push(this.labels[i]);
            terms_clone.push(this.terms[i].replace_free_variable(varname, lTerm));
        }

        return new Record(label_clone, terms_clone);
    }

    type_of(e: Environment): Type {
        let label_clone = [];
        let terms_type = [];

        for(let i=0; i<this.terms.length; i++) {
            label_clone.push(this.labels[i]);
            terms_type.push(this.terms[i].type_of(e));
        }

        return new Record_Type(label_clone, terms_type);
    }

    equals(term: LTerm): boolean {
        if(!(term instanceof Record))
            return false;

        if(term.labels.length != this.terms.length)
            return false;

        for(let i=0; i<this.terms.length; i++) {
            if(this.labels[i] != (term.labels[i])) { return false }
            if(this.terms[i].equals(term.terms[i])) { return false }
        }

        return true;
    }

}