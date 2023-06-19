import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateRoleById: builder.mutation({
        query: (payload) => ({
          url: `${config.api.url.updateInventoryType}?id=${payload.id}`,
          method: "PUT",
          body: payload.editedData,
        }),
        invalidatesTags: ['Roles'],
      }),
      addRole: builder.mutation({
        query: (payload) => ({
          url: config.api.url.addInventoryType,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ['Roles'],
      }),
    getRole: builder.query({
      query: () => ({
        url: config.api.url.inventoryType,
        method: "GET",
      }),
      providesTags: ['Roles'],
    }),
    deleteRole: builder.mutation({
        query: (id) => ({
          url: `${config.api.url.deleteInventoryType}?id=${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Roles'],
      }),
      getInventoryFormat: builder.query({
        query: (id) => ({
          url: `${config.api.url.getInventoryTypeById}?id=${id}&type=allInventries`,
          method: "GET",
        }),
        providesTags: ['Roles'],
      }),
  }),
});
export const {
//   useGetRoleQuery,
//   useAddRoleMutation,
//   useUpdateRoleByIdMutation,
//   useDeleteRoleMutation,
//   useGetRoleFormatQuery
} = roleApiSlice;