import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  isLoading: false,
  errormsg: "",
};
const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload ,errormsg:""};
    case FETCH_USERS_FAILURE:
      return { ...state, isLoading: false, errormsg: action.payload ,users:[]};
    default:
      return state;
  }
};

export default apiReducer;
