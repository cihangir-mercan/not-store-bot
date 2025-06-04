import { createAppSlice } from "../createAppSlice.ts"

export type UiSliceState = {
  searchInputFocused: boolean
}

const initialState: UiSliceState = {
  searchInputFocused: false,
}

export const uiSlice = createAppSlice({
  name: "ui",
  initialState,
  reducers: create => ({
    setSearchInputFocused: create.reducer(
      (state, action: { payload: boolean }) => {
        state.searchInputFocused = action.payload
      },
    ),
  }),

  selectors: {
    selectSearchInputFocused: ui => ui.searchInputFocused,
  },
})

export const { setSearchInputFocused } = uiSlice.actions
export const { selectSearchInputFocused } = uiSlice.selectors
