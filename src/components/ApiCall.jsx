import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/actions/actions";

function ApiCall({url}) {
  const users = useSelector((state) => state.apiReducer.users);
  const error = useSelector((state) => state.apiReducer.errormsg);
  const dispatch = useDispatch();
  console.log(users, error);
  return (
    <div>
      <button onClick={() => dispatch(fetchUsers(url))}>Api call</button>
      {error === ""
        ? users?.map((user) => <li key={user.id}>{user.name}</li>)
        : error}
    </div>
  );
}

export default ApiCall;
