import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const inventoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // deleteCategory: builder.mutation({
    //   query: (id) => ({
    //     url: `${config.api.url.inventory}/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
    // editCategory: builder.mutation({
    //   query: (payload) => ({
    //     url: `${config.api.url.inventory}/${payload.id}`,
    //     method: "PATCH",
    //     body: payload.editedData,
    //   }),
    // }),
    // addTutorialCategory: builder.mutation({
    //   query: (payload) => ({
    //     url: config.api.url.inventory,
    //     method: "POST",
    //     body: payload,
    //   }),
    // }),
    getInventory: builder.mutation({
      query: () => ({
        url: config.api.url.inventory,
        method: "GET",
      }),
    }),
    // getCategoryById: builder.mutation({
    //   query: (id) => ({
    //     url: `${config.api.url.inventory}/${id}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});
export const {
//   useAddTutorialCategoryMutation,
//   useDeleteCategoryMutation,
  useGetInventoryMutation,
//   useGetCategoryByIdMutation,
//   useEditCategoryMutation,
} = inventoriesApiSlice;