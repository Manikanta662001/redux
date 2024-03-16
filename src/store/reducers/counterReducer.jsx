import { DECREMENT, INCREMENT, INCREMENT_BY_VALUE, RESET } from "../actions/actionTypes";

const initialState = { countval: 0 };
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, countval: state.countval + 1 };
    case DECREMENT:
      return { ...state, countval: state.countval - 1 };
    case RESET:
      return { ...state, countval: state.countval - state.countval };
    case INCREMENT_BY_VALUE:
      return { ...state, countval: state.countval + action.payload };
    default:
        return state
  }
};

export default counterReducer;
