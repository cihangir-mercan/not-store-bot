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

export const itemsApiSlice = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://not-contest-cdn.openbuilders.xyz/api/",
  }),
  tagTypes: ["Items"],
  endpoints: build => ({
    getItems: build.query<ItemsApiResponse, unknown>({
      query: () => `items.json`,
      transformResponse: (response: ItemsApiResponse): ItemsApiResponse => {
        return {
          ...response,
          data: response.data.map((item, index) => {
            const images = [...item.images];
            if (images.length > index) {
              const [targetImage] = images.splice(index, 1);
              images.unshift(targetImage);
            }
            return {
              ...item,
              images,
            };
          }),
        };
      },
      providesTags: () => [{ type: "Items", id: "LIST" }],
    }),
  }),
});


export const { useGetItemsQuery } = itemsApiSlice
