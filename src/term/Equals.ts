import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Function_Type} from "../types/Function_Type";
import {Number} from "../types/Number";
import {Bool} from "../types/Bool";

export class Equals extends LTerm {
    clone(): LTerm {
        return new Equals();
    }

    free_variables(): string[] {
        return [];
    }

    is_reducible(): boolean {
        return false;
    }

    reduce(): LTerm {
        throw "aölkjdfasdf";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return this.clone();
    }

    type_of(e: Environment): Type {
        return new Function_Type(new Number(), new Function_Type(new Number(), new Bool()));
    }

    equals(term: LTerm): boolean {
        return term instanceof Equals;
    }

}