import {LTerm} from "./LTerm";
import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {Function_Type} from "../types/Function_Type";
import {Variable} from "./Variable";
import {Storage} from "../Storage";
import {Abstraction} from "./Abstraction";

export class Let extends LTerm {

    to_string(): string {
        return "let " + this.varname + "=" + this.term.to_string() + " IN " + this.body.to_string();
    }

    varname: string;
    term: LTerm;
    body: LTerm;

    constructor(varname: string, term: LTerm, body: LTerm) {
        super();
        this.varname = varname;
        this.term = term;
        this.body = body;
    }

    clone(): Let {
        return new Let(
                                    this.varname,
                                    this.term.clone(),
                                    this.body.clone()
                              );
    }

    is_reducible(): boolean {
        return true;
    }

    reduce(storage: Storage): LTerm {
        if (this.term.is_reducible()) {
            let ret1 = new Let(this.varname, this.term.reduce(storage).clone(), this.body.clone());
            return ret1;
        }

        let ret_2 = this.body.replace_free_variable(this.varname, this.term.clone());
        return ret_2;
    }

    private alpha_convert(s: LTerm) {
        let new_identifier = this.create_new_identifier(s);
        let new_body = this.body.clone().replace_free_variable(this.varname, new Variable(new_identifier));
        return new Let(new_identifier, this.term.clone(), new_body);
    }

    private create_new_identifier(s: LTerm) {
        let free_vars = this.body.free_variables();
        let free_vars_s = s.free_variables();
        let new_name = "x";

        while(free_vars.includes(new_name) || free_vars_s.includes(new_name)) {
            new_name = new_name + "x";
        }

        return new_name;
    }

    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        let this_new_term = this.term.replace_free_variable(varname, lTerm.clone());

        if(this.varname == varname) {
            return new Let(this.varname, this_new_term, this.body.clone());
        }

        let free_variables = lTerm.free_variables();

        // y € FI(s)
        if(free_variables.includes(this.varname)) {
            let alpha_converted_term = this.alpha_convert(lTerm);
            return alpha_converted_term.replace_free_variable(varname, lTerm.clone());
        }


        let this_new_body = this.body.replace_free_variable(varname, lTerm.clone());

        let ret: LTerm = new Let(this.varname, this_new_term, this_new_body);
        return ret;
    }

    free_variables(): string[] {

        let ret = [];

        let fv = this.body.free_variables();

        for (let var_n of fv) {
            if(var_n != this.varname)
                ret.push(var_n);
        }

        fv = this.term.free_variables();

        for (let var_n of fv) {
            if(var_n != this.varname)
                ret.push(var_n);
        }
        return ret;
    }

    type_of(e: Environment): Type {
        let term_type = this.term.type_of(e);
        let new_Env = e.new_Environment_with(this.varname, term_type);

        let T1 = this.body.type_of(new_Env);

        return T1;
    }

    equals(term: LTerm): boolean {
        if(term instanceof Let)
            return this.varname == term.varname &&
                    this.term.equals(term.term) &&
                    this.body.equals(term.body);

        return false;
    }

}