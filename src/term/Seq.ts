import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Bool} from "../types/Bool";
import {False} from "./False";
import {Storage} from "../Storage";

export class Seq extends LTerm {

    left: LTerm;
    right: LTerm;

    constructor(left: LTerm, right: LTerm) {
        super();
        this.left = left;
        this.right = right;
    }

    clone(): LTerm {
        return new Seq(this.left.clone(), this.right.clone());
    }

    equals(term: LTerm): boolean {
        return term instanceof Seq && term.left.equals(this.left) && term.right.equals(this.right);
    }

    free_variables(): string[] {
        let l = this.left.free_variables();
        let r = this.right.free_variables();
        return [...l, ...r];
    }

    is_reducible(): boolean {
        return true;
    }

    reduce(storage: Storage): LTerm {
        if(this.left.is_reducible()) {
            return new Seq(this.left.reduce(storage), this.right.clone())
        } else {
            return this.right.clone();
        }
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        let l = this.left.replace_free_variable(varname, lTerm.clone());
        let r = this.right.replace_free_variable(varname, lTerm.clone());

        return new Seq(l, r);
    }

    type_of(e: Environment): Type {
        let t = this.left.type_of(e);
        return this.right.type_of(e) as Type;
    }
}