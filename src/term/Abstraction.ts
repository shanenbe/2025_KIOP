import {LTerm} from "./LTerm";
import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {Function_Type} from "../types/Function_Type";
import {Variable} from "./Variable";

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

    private alpha_convert(s: LTerm) {
        let new_identifier = this.create_new_identifier(s);
        let new_body = this.body.clone().replace_free_variable(this.varname, new Variable(new_identifier));
        return new Abstraction(new_identifier, this.var_type.clone(), new_body);
    }

    private create_new_identifier(s: LTerm) {
        let free_vars = this.free_variables();
        let free_vars_s = s.free_variables();
        let new_name = "x";

        while(free_vars.includes(new_name) || free_vars_s.includes(new_name)) {
            new_name = new_name + "x";
        }

        return new_name;
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {


        let free_variables = lTerm.free_variables();

        // x != y
        if(this.varname == varname) {
            return this.clone();
        }

        // y € FI(s)
        if(free_variables.includes(this.varname)) {
            return this.alpha_convert(lTerm).replace_free_variable(varname, lTerm);
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