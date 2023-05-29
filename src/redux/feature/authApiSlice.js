import { apiSlice } from "../apiSlice/api";
import config from "../config/config";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation({
            query:credentials=>({
                url:config.api.url.login,
                method:'POST',
                body:{...credentials}
            })
        })
    })
})


export const {
    useLoginMutation
} = authApiSlice