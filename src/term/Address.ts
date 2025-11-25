import {Type} from "../types/Type";
import {Environment} from "../Environment";
import {LTerm} from "./LTerm";
import {Bool} from "../types/Bool";
import {False} from "./False";
import {Seq} from "./Seq";
import {Ref} from "../types/Ref";
import {ref} from "./ref";
import {Storage} from "../Storage";

export class Address extends LTerm {
    constructor(index_in_storage: number, type: Type) {
        super();
        this.index_in_storage = index_in_storage;
        this.type = type;
    }

    index_in_storage: number;
    type: Type;

    clone(): LTerm {
        return new Address(this.index_in_storage, this.type.clone());
    }

    equals(term: LTerm): boolean {
        return term instanceof Address && term.index_in_storage == (this.index_in_storage) &&
                    term.type.equals(this.type);
    }

    free_variables(): string[] {
        return [];
    }

    is_reducible(): boolean {
        return false;
    }


    replace_free_variable(varname: string, lTerm: LTerm): LTerm {
        return this.clone();
    }

    type_of(e: Environment): Type {
        return new Ref(this.type);
    }


    reduce(storage: Storage): LTerm {
        throw "asdfsadfsafd";
    }
}