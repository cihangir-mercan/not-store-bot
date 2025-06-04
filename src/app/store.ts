import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { cartSlice } from "@app/slices/cartSlice.ts"
import { itemsApiSlice } from "@app/slices/itemsApiSlice.ts"
import { historyApiSlice } from "@app/slices/historyApiSlice.ts"
import { uiSlice } from "@app/slices/uiSlice.ts"

const rootReducer = combineSlices(
  cartSlice,
  uiSlice,
  itemsApiSlice,
  historyApiSlice,
)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
        .concat(itemsApiSlice.middleware)
        .concat(historyApiSlice.middleware)
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
