import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice";
import { bookApi } from "../features/api/bookApi";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
const rootReducer = combineReducers({
  login: authReducer,
  [bookApi.reducerPath]: bookApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(bookApi.middleware), //
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
