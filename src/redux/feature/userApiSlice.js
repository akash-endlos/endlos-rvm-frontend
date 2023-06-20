import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserById: builder.mutation({
        query: (payload) => ({
          url: `${config.api.url.updateRole}/${payload.id}`,
          method: "PUT",
          body: payload.editedData,
        }),
        invalidatesTags: ['Users'],
      }),
      addUser: builder.mutation({
        query: (payload) => ({
          url: config.api.url.addRole,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ['Users'],
      }),
    getUsers: builder.query({
      query: () => ({
        url: config.api.url.getUser,
        method: "GET",
      }),
      providesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
        query: (id) => ({
          url: `${config.api.url.deleteRole}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Users'],
      }),
      getInventoryFormat: builder.query({
        query: (id) => ({
          url: `${config.api.url.getInventoryTypeById}?id=${id}&type=allInventries`,
          method: "GET",
        }),
        providesTags: ['Users'],
      }),
  }),
});
export const {
  useGetUsersQuery,
//   useAddUserMutation,
//   useUpdateUserByIdMutation,
//   useDeleteUserMutation,
//   useGetRoleFormatQuery
} = userApiSlice;