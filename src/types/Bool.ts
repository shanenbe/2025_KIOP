import {Type} from "./Type";

export class Bool extends Type {
    clone(): Type {
        return new Bool();
    }

    equals(T: Type): boolean {
        return T instanceof Bool;
    }

}