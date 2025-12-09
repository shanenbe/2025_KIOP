export abstract class Type {
    abstract equals(T: Type): boolean;
    abstract clone(): Type;
    abstract is_subtype_of(that_type: Type): boolean;
    abstract to_string(): string;
}