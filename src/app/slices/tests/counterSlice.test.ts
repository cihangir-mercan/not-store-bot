import type { AppStore } from "../../store.ts"
import { makeStore } from "../../store.ts"
import type { CounterSliceState } from "../counterSlice.ts"
import {
  counterSlice,
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "../counterSlice.ts"

type LocalTestContext = {
  store: AppStore
}

describe("counter reducer", () => {
  beforeEach<LocalTestContext>(context => {
    const initialState: CounterSliceState = {
      value: 3,
      status: "idle",
    }

    context.store = makeStore({ counter: initialState })
  })

  it("should handle initial state", () => {
    expect(counterSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
      value: 0,
      status: "idle",
    })
  })

  it<LocalTestContext>("should handle increment", ({ store }) => {
    expect(selectCount(store.getState())).toBe(3)

    store.dispatch(increment())

    expect(selectCount(store.getState())).toBe(4)
  })

  it<LocalTestContext>("should handle decrement", ({ store }) => {
    expect(selectCount(store.getState())).toBe(3)

    store.dispatch(decrement())

    expect(selectCount(store.getState())).toBe(2)
  })

  it<LocalTestContext>("should handle incrementByAmount", ({ store }) => {
    expect(selectCount(store.getState())).toBe(3)

    store.dispatch(incrementByAmount(2))

    expect(selectCount(store.getState())).toBe(5)
  })
})
