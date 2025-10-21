import {LTerm} from "./LTerm";
import {Type} from "../types/Type";

export class Abstraction extends LTerm {

    varname: string;
    var_type: Type;
    body: LTerm;

    constructor(varname: string, var_type: Type, body: LTerm) {
        super();
        this.varname = varname;
        this.var_type = var_type;
        this.body = body;
    }

    clone(): Abstraction {
        return new Abstraction(
                                    this.varname,
                                    this.var_type.clone(),
                                    this.body.clone()
                              );
    }

    // CALL BY VALUE!!!
    is_reducible(): boolean {
        return false;
    }

    reduce(): LTerm {
        throw "Nö...keine Reduktion von Abstracton";
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        let free_variables = lTerm.free_variables();

        if(free_variables.includes(this.varname)) {

        }

        return new Abstraction(
                this.varname,
                this.var_type.clone(),
                this.body.replace_free_variable(varname, lTerm).clone()
            );


    }

    free_variables(): string[] {

        let ret = [];

        let body_fv = this.body.free_variables();

        for (let var_n of body_fv) {
            if(var_n != this.varname)
                ret.push(var_n);
        }

        return ret;
    }
}