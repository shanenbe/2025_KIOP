/*
class Counter {
  int i = 0;
  inc() { i++ }
  geti() { return i}
  get_inc() {
    this.inc();
    return this.geti();
  }
}

class Counter2 extends Counter {
  inc() { super.inc(); super.inc();}
  get_i() {return 42;}
  get_inc2() {
    super.get_inc();
  }
}

let Counter = Livar:{i: Ref(Number)}.
              Lthis:{inc: Unit->Unit, geti: Unit-> Number. get_inc: Unit -> Number}.

              {
                 inc = Ld:Unit.
                         ivar.i := + !(ivar.i) 1,
                 geti: Ld:Unit.
                         !(ivar.i),
                 get_inc: Ld:Unit.
                         this.inc unit;
                         this.geti unit;
              }
    let Counter2 =  Livar:{i: Ref(Number)}.
                    Lthis:{
                                inc: Unit->Unit,
                                geti: Unit-> Number,
                                get_inc: Unit -> Number,
                                get_inc2: Unit -> Number
                    }.

                    let super = Ld:Unit.Counter ivar this  IN
                   {
                     inc = Ld:Unit.
                             super unit.inc unit,
                     geti: Ld:Unit.
                             42,
                     get_inc: Ld:Unit.
                             super unit.get_inc unit,
                     get_inc2: Ld:Unit.
                             super unit.get_inc unit,
                  }


    let Counter_Object2 = fix(Counter2 {i=ref(0)}) in
      Counter_Object.get_inc unit;
      Counter_Object.get_inc2 unit;

* */

import {ABS, APP, ASS, DEREF, E, F, FIX, LET, N, NUM, PJ, PLUS, R, REC, REF, RT, S, SEQ, UNIT, UT, VAR} from "./Tests";
import {Unit_Type} from "../types/Unit_Type";

let ivar_i = PJ(VAR("ivar"), "i");

let inner_rec_Counter = REC(["inc", "geti", "get_inc"],
                            [
                                ABS("d", UT(),
                                    ASS(
                                        ivar_i.clone(),
                                        APP(APP(PLUS(), DEREF(ivar_i.clone())), N(1))
                                    )
                                ),
                                ABS("d", UT(),
                                    DEREF(ivar_i.clone())
                                ),
                                ABS("d", UT(),
                                    SEQ(
                                        APP(PJ(VAR("this"), "inc"), UNIT()),
                                        APP(PJ(VAR("this"), "geti"), UNIT()),
                                    )
                                ),
                            ]
);

function super_call(function_name: string) {
    return APP(PJ(APP(VAR("super"), UNIT()), function_name), UNIT())
}

function function_call(target: string, function_name: string) {
    return APP(PJ(VAR(target), function_name), UNIT())
}
let inner_rec_Counter2 = REC(["inc", "geti", "get_inc", "get_inc2"],
    [
        ABS("d", UT(),
            super_call("inc")
        ),
        ABS("d", UT(),
            N(42)
        ),
        ABS("d", UT(),
            super_call("get_inc")
        ),
        ABS("d", UT(),
            super_call("get_inc")
        )
    ]
);



let Counter = ABS("ivar", RT(["i"], [REF(NUM())]),
                            ABS("this", RT(
                                                ["inc", "geti", "get_inc"],
                                                [   F(UT(), UT()),
                                                    F(UT(), NUM()),
                                                    F(UT(), NUM())
                                                ]),
                                    inner_rec_Counter
                            )
                         )

let Counter2 = ABS("ivar", RT(["i"], [REF(NUM())]),
    ABS("this", RT(
            ["inc", "geti", "get_inc", "get_inc2"],
            [   F(UT(), UT()),
                F(UT(), NUM()),
                F(UT(), NUM()),
                F(UT(), NUM())
            ]),
        LET("super",ABS("d", UT(), APP(APP(VAR("Counter"), VAR("ivar")), VAR("this"))),
            inner_rec_Counter2
        )
    )
)




let ivar0 = REC(["i"], [R(N(0))]);
let program =
    LET("Counter", Counter,
        LET("Counter2", Counter2,
            LET("c2", FIX(APP(VAR("Counter2"), ivar0)),
                SEQ(
                    function_call("c2", "get_inc"),
                    function_call("c2", "get_inc2")
                )
            )
        )
);

let t = program.type_of(E());
let result = program.reduce_all();

console.log(result.to_string() + " : " + t.to_string());