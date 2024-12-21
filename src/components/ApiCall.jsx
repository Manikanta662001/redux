import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/actions/actions";

function ApiCall({ url }) {
  const { users, isLoading, errormsg } = useSelector(
    (state) => state.apiReducer
  );
  const dispatch = useDispatch();
  console.log({ users, isLoading, errormsg });
  return (
    <div>
      <button onClick={() => dispatch(fetchUsers(url))}>Api call</button>
      {errormsg === "" ? (
        isLoading ? (
          <div>Loading.....</div>
        ) : (
          users?.map((user) => <li key={user.id}>{user.name}</li>)
        )
      ) : (
        errormsg
      )}
    </div>
  );
}

export default ApiCall;
