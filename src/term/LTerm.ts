import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {Storage} from "../Storage";

export abstract class LTerm {
    abstract equals(term: LTerm): boolean;
    abstract reduce(storage: Storage):LTerm;
    abstract is_reducible(): boolean;
    abstract clone():LTerm ;
    abstract replace_free_variable(varname: string, lTerm: LTerm): LTerm;
    abstract free_variables(): string[];
    abstract type_of(e: Environment): Type;

    reduce_all() {
        let that: LTerm = this;
        let storage = new Storage([]);
        // let that_original = that.to_string();
        // console.log(that_original + "----->");
        while (that.is_reducible()) {
            that = that.reduce(storage);
            let that_reduced = that.to_string();
            // console.log(that_reduced + "----->");
        }
        return that;
    }

    abstract to_string(): string;
}