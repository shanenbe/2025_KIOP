import {Type} from "./Type";

export class Bool extends Type {
    clone(): Type {
        return new Bool();
    }

}