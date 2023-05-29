import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./apiSlice/api";
import authReducer from "./feature/authSlice.js";


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware:  (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
