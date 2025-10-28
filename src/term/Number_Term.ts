import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Number} from "../types/Number";

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

    reduce(): LTerm {
        throw "sadfsadf";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return this.clone();
    }

    type_of(e: Environment): Type {
        return new Number();
    }
}