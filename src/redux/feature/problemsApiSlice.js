import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const problemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateproblemsById: builder.mutation({
        query: (payload) => ({
          url: `${config.api.url.updateInventoryType}?id=${payload.id}`,
          method: "PUT",
          body: payload.editedData,
        }),
        invalidatesTags: ['Problems'],
      }),
      addproblems: builder.mutation({
        query: (payload) => ({
          url: config.api.url.addInventoryType,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ['Problems'],
      }),
    getProblems: builder.query({
      query: () => ({
        url: config.api.url.getProblems,
        method: "GET",
      }),
      providesTags: ['Problems'],
    }),
    deleteproblems: builder.mutation({
        query: (id) => ({
          url: `${config.api.url.deleteInventoryType}?id=${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Problems'],
      }),
      getInventoryFormat: builder.query({
        query: (id) => ({
          url: `${config.api.url.getInventoryTypeById}?id=${id}&type=allInventries`,
          method: "GET",
        }),
        providesTags: ['Problems'],
      }),
  }),
});
export const {
  useGetProblemsQuery,
  useAddProblemsMutation,
  useUpdateProblemsByIdMutation,
  useDeleteProblemsMutation,
//   useGetInventoryFormatQuery
} = problemsApiSlice;