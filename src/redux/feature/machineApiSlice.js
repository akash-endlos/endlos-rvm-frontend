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
    addMachine: builder.mutation({
      query: (payload) => ({
        url: config.api.url.addMachine,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ['Machines'], 
    }),
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
  useAddMachineMutation,
  useGetMachinesQuery,
//   useGetCustomerByIdMutation,
//   useUpdateCustomerMutation,
  useDeleteMachineMutation,
} = machineApiSlice;
