import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const inventoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // updateInventoryById: builder.mutation({
    //     query: (payload) => ({
    //       url: `${config.api.url.updateInventory}?id=${payload.id}`,
    //       method: "PUT",
    //       body: payload.editedData,
    //     }),
    //     invalidatesTags: ['Inventory'],
    //   }),
      addInventory: builder.mutation({
        query: (payload) => ({
          url: config.api.url.addInventory,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ['Inventory'],
      }),
    getInventory: builder.query({
      query: () => ({
        url: config.api.url.inventory,
        method: "GET",
      }),
      providesTags: ['Inventory'],
    }),
    // deleteInventory: builder.mutation({
    //     query: (id) => ({
    //       url: `${config.api.url.deleteInventory}?id=${id}`,
    //       method: "DELETE",
    //     }),
    //     invalidatesTags: ['Inventory'],
    //   }),
    //   getInventoryFormat: builder.query({
    //     query: (id) => ({
    //       url: `${config.api.url.getInventoryById}?id=${id}&=allInventries`,
    //       method: "GET",
    //     }),
    //     providesTags: ['Inventory'],
    //   }),
  }),
});
export const {
  useGetInventoryQuery,
  useAddInventoryMutation,
  useUpdateInventoryByIdMutation,
  useDeleteInventoryMutation,
  useGetInventoryFormatQuery
} = inventoriesApiSlice;