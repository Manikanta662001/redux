import {
  DECREMENT,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  INCREMENT,
  INCREMENT_BY_VALUE,
  RESET,
} from "./actionTypes";

export const increment = () => {
  return { type: INCREMENT };
};
export const decrement = () => {
  return { type: DECREMENT };
};
export const reset = () => {
  return { type: RESET };
};
export const increment_by_async = () => {
  return { type: INCREMENT };
};
export const increment_by_value = (val) => {
  return { type: INCREMENT_BY_VALUE, payload: val };
};

export const fetchUsersRequest = () => {
  return { type: FETCH_USERS_REQUEST };
};
export const fetchUsersSuccess = (data) => {
  return { type: FETCH_USERS_SUCCESS, payload: data };
};
export const fetchUsersFailure = (errmsg) => {
  return { type: FETCH_USERS_FAILURE, payload: errmsg };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => dispatch(fetchUsersSuccess(result)))
      .catch((err) => dispatch(fetchUsersFailure(err.message)));
  };
};
