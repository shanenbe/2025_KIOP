import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Function_Type} from "../types/Function_Type";
import {Number} from "../types/Number";
import {Storage} from "../Storage";

export class Plus extends LTerm {
    to_string(): string {
        return "+";
    }
    clone(): LTerm {
        return new Plus();
    }

    free_variables(): string[] {
        return [];
    }

    is_reducible(): boolean {
        return false;
    }

    reduce(storage: Storage): LTerm {
        throw "aölkjdfasdf";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return this.clone();
    }

    type_of(e: Environment): Type {
        return new Function_Type(new Number(), new Function_Type(new Number(), new Number()));
    }

    equals(term: LTerm): boolean {
        return term instanceof Plus;
    }

}