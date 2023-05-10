import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/users/usersSlice";
import { useEffect } from "react";
import { isRejectedWithValue } from "@reduxjs/toolkit";

function Users() {
  const { userList, isLoading, error } = useSelector((state) => state.usersState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (error) {
    return (
      <h2>There is an error in loading page: {error}</h2>
    )
  }

  if (isLoading) {
    return (
      <h2>Page is loading...</h2>
    );
  }
  return (
    <div>
      <ul>
        {userList.map((user) => (
          <li key={user.id}> {user.name}</li>
        ))}
      </ul>
    </div >
  );
}

export default Users;