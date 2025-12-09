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

* */

import {ABS, APP, ASS, DEREF, E, F, FIX, N, NUM, PJ, PLUS, R, REC, REF, RT, S, SEQ, UNIT, UT, VAR} from "./Tests";
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

let Counter_object_term = FIX(APP(Counter, REC(["i"], [R(N(0))])));
let t = Counter_object_term.type_of(E());


let aufruf_get_inc = APP(PJ(Counter_object_term, "get_inc"), UNIT());
t = aufruf_get_inc.type_of(E());

let new_term = aufruf_get_inc.reduce_all()
console.log(new_term);