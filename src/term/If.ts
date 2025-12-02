import {LTerm} from "./LTerm";
import {Environment} from "../Environment";
import {Type} from "../types/Type";
import {True} from "./True";
import {False} from "./False";
import {Bool} from "../types/Bool";
import {Storage} from "../Storage";

export class If extends LTerm {

    condition: LTerm;
    then_branch: LTerm;
    else_branch: LTerm;

    constructor(condition: LTerm, then_branch: LTerm, else_branch: LTerm) {
        super();
        this.condition = condition;
        this.then_branch = then_branch;
        this.else_branch = else_branch;
    }

    clone(): LTerm {
        return new If(this.condition.clone(), this.then_branch.clone(), this.else_branch.clone());
    }

    equals(term: LTerm): boolean {
        if(term instanceof If) {
            return this.condition.equals(term.condition) &&
                    this.then_branch.equals(term.then_branch) &&
                    this.else_branch.equals(term.else_branch);
        } else
            return false;
    }

    free_variables(): string[] {
        let c_fv = this.condition.free_variables();
        let t_fv = this.then_branch.free_variables();
        let e_fv = this.else_branch.free_variables();
        return [...c_fv, ...t_fv, ...e_fv];
    }

    is_reducible(): boolean {
        return true;
    }

    reduce(storage: Storage): LTerm {

        /**                    c -> c'
         *      E-if' ======================================================
         *                  if(c) then t1 else t2 -> if(c') then t1 else t2
         */
        if(this.condition.is_reducible()) {
            return new If(this.condition.reduce(storage), this.then_branch.clone(), this.else_branch.clone());
        }

        /**
         *      E-ifTrue: if(true) then t1 else t2 ->  t1
         */
        if(this.condition.equals(new True()))
            return this.then_branch.clone();

        if(this.condition.equals(new False()))
            return this.else_branch.clone();

        throw "Invalid if....you did not typecheck the program!"
    }

    replace_free_variable(varname: string, lTerm: LTerm): If {
        return new If(
                    this.condition.replace_free_variable(varname, lTerm),
                    this.then_branch.replace_free_variable(varname, lTerm),
                    this.else_branch.replace_free_variable(varname, lTerm)
        );
    }

    /**         E|- c: Bool    E |- t1: T    E |- t2: T
     * T-if ================================================
     *          E |- if(c) then t1 else t2: T
     */
    type_of(e: Environment): Type {
        if(!this.condition.type_of(e).equals(new Bool())) {
            throw "Invalid condition type!"
        }

        let t1_T = this.then_branch.type_of(e);
        let t2_T = this.else_branch.type_of(e);

        if(!t1_T.equals(t2_T)) {
            throw "then and else must have the same type";
        }

        return t1_T.clone();
    }
}