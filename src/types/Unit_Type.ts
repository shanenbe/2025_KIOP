import {Type} from "./Type";

export class Unit_Type extends Type {
    to_string(): string {
        return "Unit";
    }

    is_subtype_of(that_type: Type): boolean {
        return that_type.equals(new Unit_Type())
    }

    clone(): Type {
        return new Unit_Type();
    }

    equals(T: Type): boolean {
        return T instanceof Unit_Type;
    }

}