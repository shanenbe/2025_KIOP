import {Type} from "./Type";

export class Number extends Type {
    clone(): Type {
        return new Number();
    }

    equals(T: Type): boolean {
        return T instanceof Number;
    }
    
}