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

export class Assign extends LTerm {
    to_string(): string {
        return this.left.to_string() + " := " + this.right.to_string();
    }

    left: LTerm;
    right: LTerm;


    constructor(left: LTerm, right: LTerm) {
        super();
        this.left = left;
        this.right = right;
    }

    clone(): LTerm {
        return new Assign(this.left.clone(), this.right.clone());
    }

    free_variables(): string[] {
        return [...this.left.free_variables(), ...this.right.free_variables()];
    }

    is_reducible(): boolean {
        return true;
    }

    reduce(storage: Storage): LTerm {
        if(this.left.is_reducible()) {
            return new Assign(this.left.reduce(storage), this.right.clone());
        }

        if(this.right.is_reducible()) {
            return new Assign(this.left.clone(), this.right.reduce(storage));
        }

        let this_address = this.left as Address;
        this_address.set_value(storage, this.right.clone());

        return new Unit();
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        let left_repl = this.left.replace_free_variable(varname, lTerm.clone());
        let right_repl = this.right.replace_free_variable(varname, lTerm.clone());
        return new Assign(left_repl, right_repl);
    }

    type_of(e: Environment): Type {
        return new Unit_Type();
    }

    equals(term: LTerm): boolean {
        if(term instanceof Assign) {
            return this.left.equals(term.left) && this.right.equals(term.right);
        }
        return false;
    }

}