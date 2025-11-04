// (Lx:Bool.x)true -> true


import {Application} from "../term/Application";
import {LTerm} from "../term/LTerm";
import {Type} from "../types/Type";
import {True} from "../term/True";
import {Bool} from "../types/Bool";
import {Variable} from "../term/Variable";
import {Abstraction} from "../term/Abstraction";
import {Environment} from "../Environment";

function APP(l: LTerm, r: LTerm) {
    return new Application(l, r);
}

function TRUE() {
    return new True();
}

function BOOL() {
    return new Bool();
}
function ABS(a: string, b: Type, c: LTerm) {
    return new Abstraction(a, b, c);
}

function VAR(x: string) {
    return new Variable(x);
}

// (Lx:Bool.x) true -> true;
let app = APP(ABS("x", BOOL(), VAR("x")), TRUE());
let result = app.reduce();

function guarantee(b: boolean, text: string) {
    if(!b)
        throw text;
}

guarantee(result.equals(TRUE()), "(Lx:Bool.x) true -> true;")

function E() {
    return new Environment([], []);
}

guarantee(app.type_of(E()).equals(BOOL()), " |- ((Lx:Bool.x) true) : Bool")