
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../feature/authSlice";
import config from "../config/config";
const baseQuery = fetchBaseQuery({
  baseUrl: config.api.base,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (
    (result?.error?.status === 401 || result?.error?.status == 403) 
  ) {
    const refreshRequest = {
      url: config.api.url.refresh,
      method: "POST",
      headers: {
        Authorization: `Bearer ${api.getState().auth.token}`,
      },
      body:{refreshToken:JSON.parse(api.getState().auth.token)}
    };
    
    const refreshResult = await baseQuery(refreshRequest, api, extraOptions);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data }));
      
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut({}));
    }
  }
  
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes:['User']
});










