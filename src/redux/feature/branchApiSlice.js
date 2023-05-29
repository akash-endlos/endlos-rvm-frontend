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
      invalidatesTags: ['Branches'], // Specify the tag to invalidate
    }),
    getBranchesByIdFormat: builder.query({
      query: (id) => ({
        url: `${config.api.url.getBranchesById}?id=${id}`,
        method: "GET",
      }),
      providesTags: ['Branches'], // Specify the tag to provide
    }),
    // getCustomerById: builder.mutation({
    //   query: (id) => ({
    //     url: `${config.api.url.getCustomerById}/${id}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useAddBranchMutation,
  useGetBranchesByIdFormatQuery,
//   useGetCustomerByIdMutation,
  useUpdateBranchByIdMutation,
} = branchesApiSlice;
