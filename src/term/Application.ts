import {LTerm} from "./LTerm";
import {Abstraction} from "./Abstraction";
import {Environment} from "../Environment";
import {Type} from "../types/Type";
import {Function_Type} from "../types/Function_Type";
import {Plus} from "./Plus";
import {Plus1} from "./Plus1";
import {Number_Term} from "./Number_Term";

export class Application extends LTerm {
    left: LTerm;
    right: LTerm;


    constructor(left: LTerm, right: LTerm) {
        super();
        this.left = left;
        this.right = right;
    }

    is_reducible(): boolean {
        return  this.left.is_reducible()
                || this.right.is_reducible()
                || this.left instanceof Abstraction
    }

    reduce():LTerm {
        if(this.left.is_reducible()) {
            /**
             *                  t1 -> t1'
             * T-App1:    ==========================
             *                 t1 t2 -> t1' t2
             */
            return new Application(
                                    this.left.reduce(),
                                    this.right.clone()
            );
        } else if (this.right.is_reducible()) {
            /**
             *                  t2 -> t2'
             * T-App1:    ==========================
             *                 t1 t2 -> t1 t2'
             */
            return new Application(
                                        this.left.clone(),
                                        this.right.reduce()
                                  )
        } else if (this.left instanceof Abstraction) {
            let body = this.left.body.clone();
            // HHHHIIIILLLLLFFFFEEEEEE!!!!!
            return body.replace_free_variable(
                this.left.varname, this.right.clone());
        } else if (this.left instanceof Plus) {
            return new Plus1(this.right.clone());
        } else if (this.left instanceof Plus1) {
            return new Number_Term(this.left.first + this.right)
        }

        throw "Something went wrong";
    }

    clone(): Application {
        return new Application(this.left.clone(), this.right.clone());
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return new Application(
            this.left.replace_free_variable(varname, lTerm.clone()),
            this.right.replace_free_variable(varname, lTerm.clone())
        )
    }

    free_variables(): string[] {
        let left_fv = this.left.free_variables();
        let right_fv = this.right.free_variables();

        // ??????????????????????????
        return [...left_fv, ...right_fv];
    }


    /**
     *            E |- left: T1->T   E |-right: T1
     * T-App: ==============================================
     *           E |- left right: T
     */

    type_of(e: Environment): Type {
        let T1 = this.right.type_of(e);
        let f: Function_Type = this.left.type_of(e) as Function_Type;
        if(f.left.equals(T1))
            return f.right;
        throw "Invalid Type";
    }
}