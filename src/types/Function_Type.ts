import {Type} from "./Type";
import {Number} from "./Number";

export class Function_Type extends Type {

    left: Type;
    right: Type;

    constructor(left: Type, right: Type) {
        super();
        this.left = left;
        this.right = right;
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