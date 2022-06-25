import React from "react";
import { Box, Stack, Badge, Avatar, Typography } from "@mui/material";
import { avatarLetters } from "../../../utils/constants";
import {
  userAvatarStyles,
  userBadgeAnchorStyles,
  userBoxStyles,
  userStackStyles,
} from "./SXUser";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedUserProfile } from "../../../features/chat";

const User = ({ element }) => {
  const { selectedUser } = useSelector((state) => state.chat.value);
  const dispatch = useDispatch();

  return (
    <Box
      component="button"
      sx={{
        ...userBoxStyles,
        bgcolor: selectedUser === element.userId ? "pseudo.main" : "inherit",
      }}
      value={element}
      onClick={(e) => {
        dispatch(addSelectedUserProfile(element.userId));
      }}
    >
      <Stack
        justifyContent="left"
        alignItems="center"
        direction="row"
        spacing={1}
        sx={userStackStyles}
      >
        <Badge
          overlap="circular"
          color={"success"}
          anchorOrigin={userBadgeAnchorStyles}
          variant="dot"
        >
          <Avatar
            sx={userAvatarStyles}
            alt={element.displayName}
            src={element.photoURL}
          >
            {element.displayName && avatarLetters(element.displayName)}
          </Avatar>
        </Badge>
        <Typography variant="body2" noWrap component="div">
          {element.displayName}
        </Typography>
      </Stack>
    </Box>
  );
};

export default User;
