import {Type} from "./types/Type";

export class Environment {
    variables: string[];
    types: Type[];


    constructor(variables: string[], types: Type[]) {
        this.variables = variables;
        this.types = types;
    }

    has_variable(var_name: string): boolean {
        for (let i = 0; i < this.variables.length; i++) {
            if(this.variables[i] === var_name) {
                return true;
            }
        }
        return false;

    }

    type_of_var(var_name: string): Type {
        for (let i = 0; i < this.variables.length; i++) {
            if(this.variables[i] === var_name) {
                return this.types[i];
            }
        }
        throw "No such variable";
    }

    new_Environment_with(var_name:string, type: Type) {
        let new_vars = [];
        let new_types = [];

        let found = false;

        for(let i = 0; i < this.variables.length; i++) {
            if(this.variables[i] != var_name) {
                new_vars.push(this.variables[i]);
                new_types.push(this.types[i]);
            } else {
                if(!found) {
                    new_vars.push(var_name);
                    new_types.push(type);
                    found = true;
                }
            }
        }

        if(!found) {
            new_vars.push(var_name);
            new_types.push(type);
        }

        return new Environment(new_vars, new_types);
    }
}