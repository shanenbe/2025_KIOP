import {Type} from "./Type";
import {Bool} from "./Bool";
import {Function_Type} from "./Function_Type";

export class Record_Type extends Type {

    labels: string[];
    types: Type[];

    constructor(labels: string[], types: Type[]) {
        super();
        this.labels = labels;
        this.types = types;
    }

    /**
     *  S-Rec
     */
    is_subtype_of(that_type: Type): boolean {
        if(!(that_type instanceof Record_Type)) return false;
        if(!(this.types.length >= that_type.types.length)) return false;

        for(let i = 0; i < that_type.types.length; i++) {
            if(!(this.labels[i] == that_type.labels[i]) || !(this.types[i].is_subtype_of(that_type.types[i]))) return false ;
        }

        return true;
    }

    clone(): Type {
        return new Record_Type(this.labels, this.types);
    }

    equals(T: Type): boolean {
        if(!(T instanceof Record_Type)) return false;
        if(!(this.types.length >= T.types.length)) return false;


        for(let i = 0; i < this.types.length; i++) {
            if(this.labels[i] !=  T.labels[i] || !(this.types[i].equals(T.types[i]))) return false;
        }

        return true;
    }

}