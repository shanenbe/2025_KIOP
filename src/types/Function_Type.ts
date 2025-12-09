import {Type} from "./Type";
import {Number} from "./Number";

export class Function_Type extends Type {
    to_string(): string {
        return "(" + this.left.to_string() + ") -> (" + this.right.to_string() + ")";
    }

    left: Type;
    right: Type;

    constructor(left: Type, right: Type) {
        super();
        this.left = left;
        this.right = right;
    }

    /*                   T1 <: S1     S2 <: T2
            S-Arrow: ==========================
                        S1 -> S2   <-   T1 -> T2
     */
    is_subtype_of(that_type: Type): boolean {
        if(!(that_type instanceof Function_Type)) return false;

        return that_type.left.is_subtype_of(this.left) &&
            this.right.is_subtype_of(that_type.right);
    }

    clone(): Type {
        return new Function_Type(this.left.clone(), this.right.clone());
    }

    equals(T: Type): boolean {
        if(T instanceof Function_Type) {
            return T.left.equals(this.left) && T.right.equals(this.right);
        }
        return false;
    }
    
}