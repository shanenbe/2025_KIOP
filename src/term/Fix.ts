import {LTerm} from "./LTerm";
import {Environment} from "../Environment";
import {Type} from "../types/Type";
import {True} from "./True";
import {False} from "./False";
import {Bool} from "../types/Bool";
import {Abstraction} from "./Abstraction";
import {Function_Type} from "../types/Function_Type";
import {Storage} from "../Storage";

export class Fix extends LTerm {

    term: LTerm;

    constructor(term: LTerm) {
        super();
        this.term = term;
    }

    clone(): LTerm {
        return new Fix(this.term.clone());
    }

    equals(term: LTerm): boolean {
        if(term instanceof Fix) {
            return this.term.equals(term);
        }
        return false;
    }

    free_variables(): string[] {
        return this.term.free_variables();
    }

    is_reducible(): boolean {
        return true;
    }

    reduce(storage: Storage): LTerm {
        if(this.term.is_reducible()) {
            return new Fix(this.term.reduce(storage));
        }

        let this_abstraction = this.term as Abstraction;

        return this_abstraction.body.replace_free_variable(
                                                            this_abstraction.varname,
                                                            this.clone()
                                                          );

    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return new Fix(this.term.replace_free_variable(varname, this.clone()));
    }

    /**           E |- t: T -> T
     * T-fix: ==================================
     *              E |- fix(t): T
     */
    type_of(e: Environment): Type {
        let term_T = this.term.type_of(e);

        if(!(term_T instanceof Function_Type))
            throw "Parameter of fix must be a function type";

        if(!term_T.left.equals(term_T.right))
            throw "Intype and return type of function type must be the same";

        return term_T.left.clone();
    }
}