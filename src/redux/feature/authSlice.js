const { createSlice } = require("@reduxjs/toolkit");

const authSlice= createSlice({
    name:"auth",
    initialState:{user:null,token:null},
    reducers:{
        setCredentials:(state,action)=>{
            const {payload} = action.payload
            state.user = payload.user
            state.token = payload.token.accessToken
        },
        logout:(state,action)=>{
            state.user=null
            state.token=null
        }
    }
})
export const {setCredentials,logout} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state)=> state.auth.user
export const selectCurrentToken = (state)=> state.auth.token