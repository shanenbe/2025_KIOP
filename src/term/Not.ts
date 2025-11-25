import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Bool} from "../types/Bool";
import {Function_Type} from "../types/Function_Type";

export class Not extends LTerm {

    clone(): LTerm {
        return new Not();
    }

    equals(term: LTerm): boolean {
        return term instanceof Not;
    }

    free_variables(): string[] {
        return [];
    }

    is_reducible(): boolean {
        return false;
    }

    reduce(): LTerm {
        throw "I cannot reduce";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return this.clone();
    }

    type_of(e: Environment): Function_Type {
        return new Function_Type(new Bool(), new Bool());
    }
 }