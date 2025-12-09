import {LTerm} from "./LTerm";
import {Abstraction} from "./Abstraction";
import {Environment} from "../Environment";
import {Type} from "../types/Type";
import {Function_Type} from "../types/Function_Type";
import {Plus} from "./Plus";
import {Plus1} from "./Plus1";
import {Number_Term} from "./Number_Term";
import {False} from "./False";
import {Not} from "./Not";
import {True} from "./True";
import {Minus} from "./Minus";
import {Minus1} from "./Minus1";
import {Equals} from "./Equals";
import {Equals1} from "./Equals1";
import {Storage} from "../Storage";

export class Application extends LTerm {
    to_string(): string {
        return "(" + this.left.to_string() + " " + this.right.to_string() + ")";
    }
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
                || this.left instanceof Plus
                || this.left instanceof Plus1
                || this.left instanceof Minus
                || this.left instanceof Minus1
                || this.left instanceof Equals
                || this.left instanceof Equals1
                || this.left instanceof Not;
    }

    reduce(storage: Storage):LTerm {
        if(this.left.is_reducible()) {
            /**
             *                  t1 -> t1'
             * T-App1:    ==========================
             *                 t1 t2 -> t1' t2
             */
            return new Application(
                                    this.left.reduce(storage),
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
                                        this.right.reduce(storage)
                                  )
        } else if (this.left instanceof Abstraction) {
            let body = this.left.body.clone();
            return body.replace_free_variable(
                this.left.varname, this.right.clone());
        } else if (this.left instanceof Plus) {
            return new Plus1(this.right.clone());
        } else if (this.left instanceof Plus1) {
            return new Number_Term(
                (this.left.first as Number_Term).num +
                (this.right as Number_Term).num)
        } else if (this.left instanceof Minus) {
            return new Minus1(this.right.clone());
        } else if (this.left instanceof Minus1) {
            return new Number_Term(
                (this.left.first as Number_Term).num -
                (this.right as Number_Term).num)
        } else if (this.left instanceof Equals) {
            return new Equals1(this.right.clone());
        } else if (this.left instanceof Equals1) {
            if((this.left.first as Number_Term).num == (this.right as Number_Term).num) {
                return new True();
            } else {
                return new False();
            }
        } else if (this.left instanceof Not) {
            if(this.right.equals(new True())) {
                return new False();
            } else if (this.right.equals(new False())) {
                return new True();
            }
            throw "Panic!";
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
        if(T1.is_subtype_of(f.left)) {
            return f.right;
        }
        throw "Invalid Type in Application";
    }

    equals(term: LTerm): boolean {
        if(term instanceof Application)
            return this.left.equals(term.left) && this.right.equals(term.right);
        return false;
    }
}