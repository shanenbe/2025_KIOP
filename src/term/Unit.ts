import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Bool} from "../types/Bool";
import {Storage} from "../Storage";
import {Unit_Type} from "../types/Unit_Type";

export class Unit extends LTerm {
    to_string(): string {
        return "unit";
    }

    clone(): LTerm {
        return new Unit();
    }

    equals(term: LTerm): boolean {
        return term instanceof Unit;
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
        return new Unit_Type();
    }
}