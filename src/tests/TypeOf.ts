import {Application} from "../term/Application";
import {LTerm} from "../term/LTerm";
import {Type} from "../types/Type";
import {True} from "../term/True";
import {Bool} from "../types/Bool";
import {Variable} from "../term/Variable";
import {Abstraction} from "../term/Abstraction";
import {Environment} from "../Environment";
import {ABS, APP, BOOL, E, F, FALSE, guarantee, IF, N, NUM, REC, RT, TRUE, VAR} from "./Tests";
import {False} from "../term/False";
import {Number_Term} from "../term/Number_Term";
import {Number} from "../types/Number";
import {Plus} from "../term/Plus";
import {Record} from "../term/Record";
import {Record_Type} from "../types/Record_Type";

// true: Bool
guarantee(new True().type_of(E()).equals(BOOL()), "true: Bool");

// false: Bool
guarantee(new False().type_of(E()).equals(BOOL()), "false: Bool");

// 1: Number
guarantee(N(1).type_of(E()).equals(NUM()), "1: Number");

// +: Number -> Number -> Number
guarantee(new Plus().type_of(E()).equals(F(NUM(), F(NUM(), NUM()))), "+: Number -> Number -> Number");

// (Lx:Bool.x): Bool -> Bool
guarantee(ABS("x", BOOL(), VAR("x")).type_of(E()).equals(F(BOOL(), BOOL())), "(Lx:Bool.x): Bool -> Bool");

//(Lx:Bool.x) false: Bool
// guarantee(APP(ABS("x", BOOL(), VAR("x")), FALSE()).type_of(E()).equals(BOOL()), "(Lx:Bool.x) false: Bool");

// if(true) then 1 else 2: Num
guarantee(IF(TRUE(), N(1), N(2)).type_of(E()).equals(NUM()), "if(true) then 1 else 2: Num");

// (Lp:{x:Num}.p) {x=42, x=666}: {x:Num}
// let term = ABS("p", new Record_Type(["x"], [NUM()]), VAR("p"));
// let app = APP(term, REC(["x", "y"], [N(42), N(666)]));
//
// let that_type = RT(["x"], [NUM()])
// let xxx = app.type_of(E());
//
// guarantee(xxx.equals(that_type), "(Lp:{x:Num}.p) {x=42, x=666}: {x:Num}") ;
