import {Type} from "./Type";
import {Bool} from "./Bool";

export class Ref extends Type {

    T: Type;

    constructor(T: Type) {
        super();
        this.T = T;
    }

    clone(): Type {
        return new Ref(this.T.clone());
    }

    equals(T: Type): boolean {
        return T instanceof Ref && this.T.equals(T);
    }

}