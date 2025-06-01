import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type ProductItem = {
  id: number
  name: string
  category: string
  description: string
  price: number
  currency: string
  left: number
  tags: Record<string, string>
  images: string[]
}

export type ItemsApiResponse = {
  ok: boolean
  data: ProductItem[]
}

// We name this slice "itemsApi" and give it a reducerPath of "itemsApi".
export const itemsApiSlice = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://not-contest-cdn.openbuilders.xyz/api/",
  }),
  tagTypes: ["Items"],
  endpoints: build => ({
    getItems: build.query<ItemsApiResponse, unknown>({
      query: () => `items.json`,
      providesTags: () => [{ type: "Items", id: "LIST" }],
    }),
  }),
})

// Auto-generated hook: useGetItemsQuery
export const { useGetItemsQuery } = itemsApiSlice
