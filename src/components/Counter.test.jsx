import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import counterReducer from "../store/reducers/counterReducer";
import apiReducer from "../store/reducers/apiReducer";
const rootReducer = combineReducers({
  counterReducer,
  apiReducer,
});


const renderWithProvider = (component, { initialState } = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
  return { ...render(<Provider store={store}>{component}</Provider>), store };
};
describe("Counter Component", () => {
  const initialState = {
    counterReducer: { countval: 0 },
    apiReducer: { users: [], isLoading: false, errormsg: "" },
  };
  const user = userEvent.setup();
  test("renders correctly and Match the Snapshot", () => {
    const { asFragment } = renderWithProvider(<Counter />, { initialState });
    expect(asFragment(<Counter />)).toMatchSnapshot();
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("0");
  });
  afterEach(cleanup);

  test("dispatches increment action when we click + button", async () => {
    const { store } = renderWithProvider(<Counter />, { initialState });
    const incButton = screen.getByRole("button", { name: "+" });
    await user.click(incButton);
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("1");
    //to test the store value
    expect(store.getState().counterReducer.countval).toBe(1);
  });
  test("dispatches decrement action when we click - button", async () => {
    const { store } = renderWithProvider(<Counter />, { initialState });
    const decButton = screen.getByRole("button", { name: "-" });
    await user.click(decButton);
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("-1");
    //to test the store value
    expect(store.getState().counterReducer.countval).toBe(-1);
  });
  test("dispatches reset action when we click RESET button", async () => {
    const { store } = renderWithProvider(<Counter />, { initialState });
    const resetButton = screen.getByRole("button", { name: "RESET" });
    await user.click(resetButton);
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("0");
    //to test the store value
    expect(store.getState().counterReducer.countval).toBe(0);
  });
  test("increments by some delay", async () => {
    const { store } = renderWithProvider(<Counter />, { initialState });
    const delayButton = screen.getByRole("button", { name: "+ by some delay" });
    await user.click(delayButton);
    await waitFor(
      () => {
        expect(store.getState().counterReducer.countval).toBe(1);
        expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
          "1"
        );
      },
      { timeout: 2000 }
    );
  });
  test("increment by value", async () => {
    const { store } = renderWithProvider(<Counter />, { initialState });
    const input = screen.getByRole("spinbutton");
    await user.type(input, "3");
    const valueButton = screen.getByRole("button", {
      name: "increment by value",
    });
    await user.click(valueButton);
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("3");
  });
});
