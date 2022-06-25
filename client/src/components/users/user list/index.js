import React from "react";
import { List } from "@mui/material";
import User from "../user";

const UserList = ({ usersList }) => {
  return (
    <List dense={false}>
      {usersList &&
        usersList.map((element) => (
          <User key={element.userId} element={element} />
        ))}
    </List>
  );
};

export default UserList;
