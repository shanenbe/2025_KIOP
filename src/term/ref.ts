import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Bool} from "../types/Bool";
import {False} from "./False";
import {Seq} from "./Seq";
import {Ref} from "../types/Ref";
import {Address} from "./Address";
import {Storage} from "../Storage";

export class ref extends LTerm {
    constructor(term: LTerm) {
        super();
        this.term = term;
    }

    term: LTerm;


    clone(): LTerm {
        return new ref(this.term.clone());
    }

    equals(term: LTerm): boolean {
        return term instanceof ref && term.equals(this.term);
    }

    free_variables(): string[] {
        return this.term.free_variables();
    }

    is_reducible(): boolean {
        return true;
    }


    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        let l = this.term.replace_free_variable(varname, lTerm.clone());
        return new ref(l);
    }

    type_of(e: Environment): Type {
        let t = this.term.type_of(e);
        return new Ref(t.clone());
    }


    reduce(storage: Storage): LTerm {
        if(this.term.is_reducible())
            return new ref(this.term.reduce());

        let T = this.term.type_of(new Environment([], []));
        storage.push(this.term.clone());

        return new Address(storage.terms.length-1, T);
    }
}