import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const branchesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // updateCustomer: builder.mutation({
    //   query: (payload) => ({
    //     url: `${config.api.url.updateCustomer}?id=${payload.id}`,
    //     method: "PUT",
    //     body: payload.editedData,
    //   }),
    //   invalidatesTags: ['Customers'],
    // }),
    // addCustomer: builder.mutation({
    //   query: (payload) => ({
    //     url: config.api.url.addCustomer,
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ['Customers'], // Specify the tag to invalidate
    // }),
    getBranchesById: builder.mutation({
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
//   useAddCustomerMutation,
  useGetBranchesByIdMutation,
//   useGetCustomerByIdMutation,
//   useUpdateCustomerMutation,
} = branchesApiSlice;
