import {LTerm} from "./LTerm";
import {Environment} from "../Environment";
import {Type} from "../types/Type";

export class Variable extends LTerm {

    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    free_variables(): string[] {
        return [this.name];
    }

    is_reducible(): boolean {
        return false;
    }

    clone(): Variable {
        return new Variable(this.name);
    }

    reduce(): LTerm {
        throw "Nö";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        if (varname == this.name) {
            return lTerm.clone();
        } else {
            return this.clone();
        }
    }

    /**
     *             (name,T) € E
     * T-Var: ==============================================
     *           E |- name: T
     */
    type_of(e: Environment): Type {
        if (!e.has_variable(this.name)) {
            throw "var has no type";
        } else {
            return e.type_of_var(this.name);
        }
        throw "Invlid stuff.....do I understand TypeScript?";
    }

    equals(term: LTerm): boolean {
        if(term instanceof Variable) {
            return this.name === term.name;
        }
        return false;
    }
}