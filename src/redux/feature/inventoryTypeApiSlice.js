import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const inventoriesTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateInventoryTypeById: builder.mutation({
        query: (payload) => ({
          url: `${config.api.url.updateInventoryType}?id=${payload.id}`,
          method: "PUT",
          body: payload.editedData,
        }),
        invalidatesTags: ['InventoryType'],
      }),
      addInventoryType: builder.mutation({
        query: (payload) => ({
          url: config.api.url.addInventoryType,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ['InventoryType'],
      }),
      getBranchesByIdFormat: builder.query({
        query: (id) => ({
          url: `${config.api.url.getBranchesById}?id=${id}`,
          method: "GET",
        }),
        providesTags: ['InventoryType'],
      }),
    getInventoryType: builder.query({
      query: () => ({
        url: config.api.url.inventoryType,
        method: "GET",
      }),
      providesTags: ['InventoryType'],
    }),
    deleteInventoryType: builder.mutation({
        query: (id) => ({
          url: `${config.api.url.deleteInventoryType}?id=${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['InventoryType'],
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
  useGetInventoryTypeQuery,
  useAddInventoryTypeMutation,
  useUpdateInventoryTypeByIdMutation,
  useDeleteInventoryTypeMutation,
//   useGetCategoryByIdMutation,
//   useEditCategoryMutation,
} = inventoriesTypeApiSlice;