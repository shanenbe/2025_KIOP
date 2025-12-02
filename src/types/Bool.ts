import {Type} from "./Type";

export class Bool extends Type {

    is_subtype_of(that_type: Type): boolean {
        return that_type.equals(new Bool())
    }

    clone(): Type {
        return new Bool();
    }

    equals(T: Type): boolean {
        return T instanceof Bool;
    }

}