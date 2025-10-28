export abstract class Type {
    abstract equals(T: Type): boolean;
    abstract clone(): Type;
}