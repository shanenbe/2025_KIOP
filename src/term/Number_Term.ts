import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Number} from "../types/Number";
import {Storage} from "../Storage";

export class Number_Term extends LTerm {
    constructor(num: number) {
        super();
        this.num = num;
    }
    num: number;

    clone(): LTerm {
        return new Number_Term(this.num);
    }

    free_variables(): string[] {
        return [];
    }

    is_reducible(): boolean {
        return false;
    }

    reduce(storage: Storage): LTerm {
        throw "sadfsadf";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return this.clone();
    }

    type_of(e: Environment): Type {
        return new Number();
    }

    equals(term: LTerm): boolean {
        if(term instanceof Number_Term) {
            return this.num === term.num;
        }
        return false;
    }
}