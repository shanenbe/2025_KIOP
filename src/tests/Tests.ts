// (Lx:Bool.x)true -> true


import {Application} from "../term/Application";
import {LTerm} from "../term/LTerm";
import {Type} from "../types/Type";
import {True} from "../term/True";
import {Bool} from "../types/Bool";
import {Variable} from "../term/Variable";
import {Abstraction} from "../term/Abstraction";
import {Environment} from "../Environment";
import {Number_Term} from "../term/Number_Term";
import {Number} from "../types/Number";
import {Function_Type} from "../types/Function_Type";
import {False} from "../term/False";
import {If} from "../term/If";

export function APP(l: LTerm, r: LTerm) {
    return new Application(l, r);
}

export function TRUE() {
    return new True();
}

export function FALSE() {
    return new False();
}


export function BOOL() {
    return new Bool();
}


export function NUM():Type {
    return new Number();
}

export function F(l: Type, r: Type):Function_Type {
    return new Function_Type(l, r);
}

export function ABS(a: string, b: Type, c: LTerm) {
    return new Abstraction(a, b, c);
}

export function VAR(x: string) {
    return new Variable(x);
}

export function E() {
    return new Environment([], []);
}

export function N(n: number): Number_Term {
    return new Number_Term(n);
}

export function IF(c: LTerm, t1:LTerm, t2:LTerm) {
    return new If(c, t1, t2);
}

export function guarantee(b: boolean, text: string) {
    if(!b) {
        console.error("Failed: " + text);
        throw text;
    }

    console.log("OK: " + text);
}