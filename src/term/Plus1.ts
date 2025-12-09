import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Function_Type} from "../types/Function_Type";
import {Number} from "../types/Number";
import {Storage} from "../Storage";

export class Plus1 extends LTerm {
    to_string(): string {
        return "(+ " + this.first.to_string() + ")";
    }

    first: LTerm;

    constructor(first: LTerm) {
        super();
        this.first = first;
    }

    clone(): LTerm {
        return new Plus1(this.first.clone());
    }

    free_variables(): string[] {
        return this.first.free_variables();
    }

    is_reducible(): boolean {
        return false;
    }

    reduce(storage: Storage): LTerm {
        throw "asdfsadf";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return new Plus1(this.first.replace_free_variable(varname, lTerm));
    }

    type_of(e: Environment): Type {
        return new Function_Type(new Number(), new Number());
    }

    equals(term: LTerm): boolean {
        return term instanceof Plus1 && term.first.equals(this.first);
    }

}