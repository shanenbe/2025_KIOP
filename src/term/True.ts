import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Bool} from "../types/Bool";
import {Storage} from "../Storage";

export class True extends LTerm {
    to_string(): string {
        return "true";
    }

    clone(): LTerm {
        return new True();
    }

    equals(term: LTerm): boolean {
        return term instanceof True;
    }

    free_variables(): string[] {
        return [];
    }

    is_reducible(): boolean {
        return false;
    }

    reduce(storage: Storage): LTerm {
        throw "I cannot reduce";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return this.clone();
    }

    type_of(e: Environment): Type {
        return new Bool();
    }
 }