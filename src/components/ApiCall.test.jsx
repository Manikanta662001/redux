import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import apiReducer from "../store/reducers/apiReducer";
import ApiCall from "./ApiCall";
import { Provider } from "react-redux";
import { fetchUsers } from "../store/actions/actions";
const rootReducer = combineReducers({
  apiReducer,
});
const renderWithProvider = (component, { initialState } = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
  return { ...render(<Provider store={store}>{component}</Provider>), store };
};

jest.mock("../store/actions/actions", () => ({
  fetchUsers: jest.fn(),
}));

describe("ApiCall Component", () => {
  const initialState = {
    apiReducer: { users: [], isLoading: false, errormsg: "" },
  };
  const user = userEvent.setup();
  test("renders correctly and Match the Snapshot", () => {
    const { asFragment } = renderWithProvider(
      <ApiCall url={"https://jsonplaceholder.typicode.com/users"} />,
      { initialState }
    );
    expect(
      asFragment(<ApiCall url={"https://jsonplaceholder.typicode.com/users"} />)
    ).toMatchSnapshot();
  });
  test("fetching users without error", async () => {
    fetchUsers.mockImplementation(() => (dispatch) => {
      dispatch({
        type: "FETCH_USERS_SUCCESS",
        payload: [{ id: 1, name: "John Doe" }],
      });
    });
    renderWithProvider(
      <ApiCall url={"https://jsonplaceholder.typicode.com/users"} />,
      { initialState }
    );
    const apiBtn = screen.getByRole("button", { name: "Api call" });
    await user.click(apiBtn);
    const litags = await screen.findAllByRole("listitem");
    expect(litags).toHaveLength(1);
    expect(litags[0]).toHaveTextContent("John Doe");
  });
  test("error while fetching", async () => {
    fetchUsers.mockImplementation(() => (dispatch) => {
      dispatch({
        type: "FETCH_USERS_FAILURE",
        payload: "Error while Fetching",
      });
    });
    renderWithProvider(
      <ApiCall url={"https://jsonplaceholder.typicode.com/users"} />,
      { initialState }
    );
    const apiBtn = screen.getByRole("button", { name: "Api call" });
    await user.click(apiBtn);
    expect(await screen.findByText(/Error while Fetching/)).toBeInTheDocument();
  });
});
