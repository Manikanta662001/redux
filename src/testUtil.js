import counterReducer from "./store/reducers/counterReducer";
import apiReducer from "./store/reducers/apiReducer";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { combineReducers } from "redux";
import { Provider } from "react-redux";

export const renderWithProvider = (
  ui,
  preloadedState = {},
  customReducers = {}
) => {
  const rootReducer = combineReducers({
    counterReducer,
    apiReducer,
    ...customReducers,
  });
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};
