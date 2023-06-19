import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, logout, setCredentials } from "../feature/authSlice";
import config from "../config/config";
import { store } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: config.api.base,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithTokenRefresh = async (args, api, extraOptions) => {
    try {
      const response = await baseQuery(args, api, extraOptions);
      // Check if the response indicates a token expiration or authentication error
      if (response.error && response.error.status === 401) {
        const { dispatch, getState } = api;
        const refreshTokenResponse = await fetch(`${config.api.base}${config.api.url.refresh}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
          // Include any necessary refresh token data in the request body
          body: JSON.stringify({
            refreshToken: getState().auth.token,
          }),
        });
        
        if (refreshTokenResponse.status===200) {
          const data = await refreshTokenResponse.json();
          // Update the token in the Redux state using the setCredentials action
          dispatch(setCredentials({ token: data.token }));
  
          // Retry the original request with the new token
          const retryResponse = await baseQuery(args, api, extraOptions);
          return retryResponse;
        } else {
            // dispatch({setCredentials()})
            // dispatch(setCredentials({ user: null,token:null }));
          dispatch(logout({user:null,token:null}))
          // window.location.href = '/';
        }
      }
  
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  

export const apiSlice = createApi({
  baseQuery: baseQueryWithTokenRefresh,
  endpoints: (builder) => ({}),
  tagTypes: ['Customers','Branches','InventoryType','Inventory','Machines','Roles'],
});
