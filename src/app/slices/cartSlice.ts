// stores/cartSlice.ts

import { createAppSlice } from "../createAppSlice.ts"

export type CartItem = {
  id: number
  quantity: number
}

export type CartSliceState = {
  products: CartItem[]
}

const initialState: CartSliceState = {
  products: [],
}

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: create => ({
    // Add a product to the cart. If it already exists, increment its quantity by 1.
    addToCart: create.reducer((state, action: { payload: { id: number } }) => {
      const id = action.payload.id
      const existing = state.products.find(item => item.id === id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.products.push({ id, quantity: 1 })
      }
    }),

    // Remove a product completely from the cart (remove from array).
    removeFromCart: create.reducer(
      (state, action: { payload: { id: number } }) => {
        const id = action.payload.id
        state.products = state.products.filter(item => item.id !== id)
      },
    ),

    // Increment the quantity of an existing product by 1.
    incrementQuantity: create.reducer(
      (state, action: { payload: { id: number } }) => {
        const id = action.payload.id
        const existing = state.products.find(item => item.id === id)
        if (existing) {
          existing.quantity += 1
        }
      },
    ),

    // Decrement the quantity of an existing product by 1. If it would become 0, remove the product from the array.
    decrementQuantity: create.reducer(
      (state, action: { payload: { id: number } }) => {
        const id = action.payload.id
        const index = state.products.findIndex(item => item.id === id)
        if (index !== -1) {
          if (state.products[index].quantity > 1) {
            state.products[index].quantity -= 1
          } else {
            state.products.splice(index, 1)
          }
        }
      },
    ),

    // Clear the cart completely
    clearCart: create.reducer(state => {
      state.products = []
    }),
  }),

  selectors: {
    // Return all products in the cart as an array
    selectCart: cart => cart.products,

    // Return the quantity for the given product ID (0 if not found)
    selectQuantityById: cart => (id: number) => {
      const found = cart.products.find(item => item.id === id)
      return found ? found.quantity : 0
    },

    // Total number of items in the cart: sum of all quantities
    selectTotalCount: cart =>
      cart.products.reduce((sum, item) => sum + item.quantity, 0),
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions

export const { selectCart, selectQuantityById, selectTotalCount } =
  cartSlice.selectors
