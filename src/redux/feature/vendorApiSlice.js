import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const vendorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateVendor: builder.mutation({
      query: (payload) => ({
        url: `${config.api.url.updateVendor}/${payload.id}`,
        method: "PUT",
        body: payload.editedData,
      }),
      invalidatesTags: ['Vendors'],
    }),
    addVendor: builder.mutation({
      query: (payload) => ({
        url: config.api.url.addVendor,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ['Vendors'], 
    }),
    getVendors: builder.query({
      query: () => ({
        url: config.api.url.getallVendors,
        method: "GET",
      }),
      providesTags: ['Vendors'], 
    }),
    getVendorById: builder.mutation({
      query: (id) => ({
        url: `${config.api.url.getVendorById}?id=${id}`,
        method: "GET",
      }),
    }),
    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `${config.api.url.deleteVendor}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Vendors'],
    }),
  }),
});

export const {
  useAddVendorMutation,
  useGetVendorsQuery,
  useGetVendorByIdMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
} = vendorsApiSlice;
