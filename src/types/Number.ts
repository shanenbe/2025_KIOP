import {Type} from "./Type";

export class Number extends Type {

    is_subtype_of(that_type: Type): boolean {
        return that_type.equals(new Number())
    }

    clone(): Type {
        return new Number();
    }

    equals(T: Type): boolean {
        return T instanceof Number;
    }
    
}