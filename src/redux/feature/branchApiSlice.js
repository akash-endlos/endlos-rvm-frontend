import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const branchesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBranchById: builder.mutation({
      query: (payload) => ({
        url: `${config.api.url.updateBranch}?id=${payload.id}`,
        method: "PUT",
        body: payload.editedData,
      }),
      invalidatesTags: ['Branches'],
    }),
    addBranch: builder.mutation({
      query: (payload) => ({
        url: config.api.url.addBranch,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ['Branches'],
    }),
    getBranchesByIdFormat: builder.query({
      query: (id) => ({
        url: `${config.api.url.getBranchesById}?id=${id}`,
        method: "GET",
      }),
      providesTags: ['Branches'],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `${config.api.url.deleteBranch}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Branches'],
    }),
  }),
});

export const {
  useAddBranchMutation,
  useGetBranchesByIdFormatQuery,
  useDeleteBranchMutation,
  useUpdateBranchByIdMutation,
} = branchesApiSlice;
