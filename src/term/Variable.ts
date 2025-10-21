import {LTerm} from "./LTerm";

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
}