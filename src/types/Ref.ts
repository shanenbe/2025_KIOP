import {Type} from "./Type";
import {Bool} from "./Bool";

export class Ref extends Type {

    T: Type;

    constructor(T: Type) {
        super();
        this.T = T;
    }

    is_subtype_of(that_type: Type): boolean {
        if(!(that_type instanceof Ref)) return false;

        return this.T.equals(that_type.T);

    }

    clone(): Type {
        return new Ref(this.T.clone());
    }

    equals(T: Type): boolean {
        return T instanceof Ref && this.T.equals(T);
    }

}