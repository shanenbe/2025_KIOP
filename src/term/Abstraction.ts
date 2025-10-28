import {LTerm} from "./LTerm";
import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {Function_Type} from "../types/Function_Type";

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

    /**
     *       new_Env = E,(varname:var_type) |- body: T1
     * T-Abs: ==============================================
     *           E |- Lvarname:var_type.body : var_type->T1
     */

    type_of(e: Environment): Type {
        let new_Env = e.new_Environment_with(this.varname, this.var_type);

        let T1 = this.body.type_of(new_Env);

        return new Function_Type(this.var_type.clone(), T1.clone())
    }
}