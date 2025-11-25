import {Type} from "../types/Type";
import {Environment} from "../Environment";

export abstract class LTerm {
    abstract equals(term: LTerm): boolean;
    abstract reduce():LTerm;
    abstract is_reducible(): boolean;
    abstract clone():LTerm ;
    abstract replace_free_variable(varname: string, lTerm: LTerm): LTerm;
    abstract free_variables(): string[];
    abstract type_of(e: Environment): Type;

    reduce_all() {
        let that: LTerm = this;
        while (that.is_reducible()) {
            that = that.reduce();
        }
        return that;
    }

}