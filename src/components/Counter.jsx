import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  increment_by_async,
  increment_by_value,
  reset,
} from "../store/actions/actions";
function Counter() {
  const countVal = useSelector((state) => state.counterReducer.countval);
  const dispatch = useDispatch();
  const [val, setVal] = useState(0);
  return (
    <div>
      <h4>{countVal}</h4>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(reset())}>RESET</button>
        <button
          onClick={() => {
            setTimeout(() => {
              dispatch(increment_by_async());
            }, 1500);
          }}
        >
          + by some delay
        </button>
      </div>
      <input
        type="number"
        placeholder="Enter A Number"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button onClick={()=>dispatch(increment_by_value(Number(val)))}>increment by value</button>
    </div>
  );
}

export default Counter;
