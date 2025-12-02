// (Lx:Bool.x)true -> true


import {Application} from "../term/Application";
import {LTerm} from "../term/LTerm";
import {Type} from "../types/Type";
import {True} from "../term/True";
import {Bool} from "../types/Bool";
import {Variable} from "../term/Variable";
import {Abstraction} from "../term/Abstraction";
import {Environment} from "../Environment";
import {ABS, APP, BOOL, EQU, F, FALSE, FIX, guarantee, IF, MINUS, N, NOT, NUM, PLUS, TRUE, VAR} from "./Tests";
import {Storage} from "../Storage";

// (Lx:Bool.x) true -> true;
let app = APP(ABS("x", BOOL(), VAR("x")), TRUE());
let result = app.reduce(new Storage([]));

guarantee(result.equals(TRUE()), "(Lx:Bool.x) true -> true;");

// (Lx:Bool.not x) true -> false;
app = APP(ABS("x", BOOL(), APP(NOT(), VAR("x"))), TRUE());
result = app.reduce_all();
guarantee(result.equals(FALSE()), "(Lx:Bool.not x) true -> false");

// (Lx:Number.plus x 1) 42 -> 43;
app = APP(ABS("x", NUM(), APP(APP(PLUS(), VAR("x")), N(1))), N(42));
result = app.reduce_all();
guarantee(result.equals(N(43)), "(Lx:Number.plus x 1) 42 -> 43");

// fix (Lsum: Num->Num. Ln:Number.if(= n 1) 1 else + 1 (sum(- n 1)) 1
let func = ABS("sum", F(NUM(), NUM()), ABS("n", NUM(),
                        IF(APP(APP(EQU(), VAR("n")), N(1)), N(1),
                            APP(APP(PLUS(), N(1)), APP(VAR("sum"),
                                APP(APP(MINUS(), VAR("n")), N(1)))))));

let fixFun = FIX(func);
//let r = fixFun.reduce();

app = APP(fixFun, N(1));
result = app.reduce_all();
guarantee(result.equals(N(1)), "fix(sum) 1 -> 1");

app = APP(fixFun, N(2));
guarantee(result.equals(N(1)), "fix(sum) 2 -> 3");

app = APP(fixFun, N(3));
guarantee(result.equals(N(1)), "fix(sum) 3 -> 6");
