import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const problemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateSolutionById: builder.mutation({
        query: (payload) => ({
          url: `${config.api.url.updateProblem}/${payload.id}`,
          method: "PUT",
          body: payload.editedData,
        }),
        invalidatesTags: ['Solutions'],
      }),
      addSolution: builder.mutation({
        query: (payload) => ({
          url: config.api.url.addProblem,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ['Solutions'],
      }),
    getSolutions: builder.query({
      query: () => ({
        url: config.api.url.getSolutions,
        method: "GET",
      }),
      providesTags: ['Solutions'],
    }),
    deleteSolution: builder.mutation({
        query: (id) => ({
          url: `${config.api.url.deletProblem}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Solutions'],
      }),
    //   getInventoryFormat: builder.query({
    //     query: (id) => ({
    //       url: `${config.api.url.getInventoryTypeById}?id=${id}&type=allInventries`,
    //       method: "GET",
    //     }),
    //     providesTags: ['Solutions'],
    //   }),
  }),
});
export const {
  useGetSolutionsQuery,
  useAddSolutionMutation,
  useUpdateSolutionByIdMutation,
  useDeleteSolutionMutation,
//   useGetInventoryFormatQuery
} = problemsApiSlice;