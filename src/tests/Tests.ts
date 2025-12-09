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
import {Not} from "../term/Not";
import {Plus} from "../term/Plus";
import {Equals} from "../term/Equals";
import {Minus} from "../term/Minus";
import {Fix} from "../term/Fix";
import {Record} from "../term/Record";
import {Record_Type} from "../types/Record_Type";
import {Unit_Type} from "../types/Unit_Type";
import {Assign} from "../term/Assign";
import {Projection} from "../term/Projection";
import {Deref} from "../term/Deref";
import {Seq} from "../term/Seq";
import {Unit} from "../term/Unit";
import {Ref} from "../types/Ref";
import {ref} from "../term/ref";
import {Storage} from "../Storage";
import {Let} from "../term/Let";

export function APP(l: LTerm, r: LTerm) {
    return new Application(l, r);
}

export function REC(l: string[], t: LTerm[]) {
    return new Record(l, t);
}

export function RT(l: string[], t: Type[]) {
    return new Record_Type(l, t);
}

export function TRUE() {
    return new True();
}

export function PLUS() {
    return new Plus();
}

export function MINUS() {
    return new Minus();
}

export function NOT() {
    return new Not();
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

export function FIX(t: LTerm) {
    return new Fix(t);
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

export function EQU() {
    return new Equals();
}

export function guarantee(b: boolean, text: string) {
    if(!b) {
        console.error("Failed: " + text);
        throw text;
    }

    console.log("OK: " + text);
}

export function UNIT() {
    return new Unit();
}

export function UT() {
    return new Unit_Type();
}

export function REF(t:Type) {
    return new Ref(t);
}

export function ASS(left: LTerm, right:LTerm) {
    return new Assign(left, right);
}

export function PJ(record: LTerm, label:string) {
    return new Projection(record, label);
}

export function DEREF(term: LTerm) {
    return new Deref(term);
}

export function SEQ(l:LTerm, r:LTerm) {
    return new Seq(l, r);
}

export function R(l: LTerm):ref {
    return new ref(l);
}

export function S(): Storage {
    return new Storage([]);
}

export function LET(n: string, t: LTerm, b: LTerm) {
    return new Let(n, t, b);
}