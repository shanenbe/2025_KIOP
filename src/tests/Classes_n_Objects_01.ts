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

let Counter_Object = fix(Counter {i=ref(0)]) in
  Counter_Object.get_inc unit;
  Counter_Object.get_inc unit;

* */

import {ABS, APP, ASS, DEREF, E, F, FIX, LET, N, NUM, PJ, PLUS, R, REC, REF, RT, S, SEQ, UNIT, UT, VAR} from "./Tests";
import {Unit_Type} from "../types/Unit_Type";

let ivar_i = PJ(VAR("ivar"), "i");

let inner_rec = REC(["inc", "geti", "get_inc"],
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

let Counter = ABS("ivar", RT(["i"], [REF(NUM())]),
                            ABS("this", RT(
                                                ["inc", "geti", "get_inc"],
                                                [   F(UT(), UT()),
                                                    F(UT(), NUM()),
                                                    F(UT(), NUM())
                                                ]),
                                    inner_rec
                            )
                         )

let program = LET("Counter_Object", FIX(APP(Counter, REC(["i"], [R(N(0))]))), SEQ(
                                                                                                            APP(PJ(VAR("Counter_Object"), "get_inc"), UNIT()),
                                                                                                            APP(PJ(VAR("Counter_Object"), "get_inc"), UNIT())
));

let t = program.type_of(E());
let result = program.reduce_all()

console.log(result.to_string() + " : " + t.to_string());