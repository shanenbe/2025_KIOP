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
import {Projection} from "./Projection";
import {Address} from "./Address";
import {Unit} from "./Unit";
import {Unit_Type} from "../types/Unit_Type";
import {Assign} from "./Assign";
import {Ref} from "../types/Ref";

export class Deref extends LTerm {
    to_string(): string {
        return "!" + this.term.to_string();
    }

    term: LTerm;

    constructor(term: LTerm) {
        super();
        this.term = term;
    }

    clone(): LTerm {
        return new Deref(this.term.clone());
    }

    free_variables(): string[] {
        return this.term.free_variables();
    }

    is_reducible(): boolean {
        return true;
    }

    reduce(storage: Storage): LTerm {
        if(this.term.is_reducible()) {
            return new Deref(this.term.reduce(storage));
        }

        let this_address = this.term as Address;
        return this_address.get_value(storage);
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return new Deref(this.term.replace_free_variable(varname, lTerm));
    }

    type_of(e: Environment): Type {
        let this_ref_type = this.term.type_of(e) as Ref;
        return this_ref_type.T;
    }

    equals(term: LTerm): boolean {
        if(term instanceof Deref) {
            return this.term.equals(term.term);
        }
        return false;
    }

}