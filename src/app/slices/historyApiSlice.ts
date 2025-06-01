import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type HistoryItem = {
  id: number           // Product ID
  timestamp: number    // UNIX timestamp (seconds)
  total: number        // Total price paid
  currency: string     // e.g. "NOT"
}

export type HistoryApiResponse = {
  ok: boolean
  data: HistoryItem[]
}

export const historyApiSlice = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://not-contest-cdn.openbuilders.xyz/api/",
  }),
  tagTypes: ["History"],
  endpoints: (build) => ({
    getHistory: build.query<HistoryApiResponse, unknown>({
      query: () => "history.json",
      transformResponse: (response: HistoryApiResponse): HistoryApiResponse => ({
        ...response,
        data: [...response.data].sort((a, b) => b.timestamp - a.timestamp),
      }),
      providesTags: () => [{ type: "History", id: "LIST" }],
    }),
  }),
})


export const { useGetHistoryQuery } = historyApiSlice
