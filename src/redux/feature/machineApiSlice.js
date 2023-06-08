import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const machineApiSlice = apiSlice.injectEndpoints({
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
    //   invalidatesTags: ['Customers'], 
    // }),
    getMachines: builder.query({
      query: () => ({
        url: config.api.url.getAllMachines,
        method: "GET",
      }),
      providesTags: ['Machines'], 
    }),
    // getCustomerById: builder.mutation({
    //   query: (id) => ({
    //     url: `${config.api.url.getCustomerById}/${id}`,
    //     method: "GET",
    //   }),
    // }),
    deleteMachine: builder.mutation({
      query: (id) => ({
        url: `${config.api.url.deleteMachine}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Machines'],
    }),
  }),
});

export const {
//   useAddCustomerMutation,
  useGetMachinesQuery,
//   useGetCustomerByIdMutation,
//   useUpdateCustomerMutation,
  useDeleteMachineMutation,
} = machineApiSlice;
