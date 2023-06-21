import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const problemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProblemById: builder.mutation({
        query: (payload) => ({
          url: `${config.api.url.updateProblem}/${payload.id}`,
          method: "PUT",
          body: payload.editedData,
        }),
        invalidatesTags: ['Problems'],
      }),
      addProblem: builder.mutation({
        query: (payload) => ({
          url: config.api.url.addProblem,
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
    deleteProblem: builder.mutation({
        query: (id) => ({
          url: `${config.api.url.deletProblem}/${id}`,
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
  useAddProblemMutation,
  useUpdateProblemByIdMutation,
  useDeleteProblemMutation,
//   useGetInventoryFormatQuery
} = problemsApiSlice;