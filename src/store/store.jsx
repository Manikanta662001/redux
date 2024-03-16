import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterReducer";
import apiReducer from "./reducers/apiReducer";
const rootReducer = combineReducers({
  counterReducer,
  apiReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
