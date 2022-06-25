import * as React from "react";

import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Stack } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

import UserList from "../../components/users/user list";
import {
  sidePanelContentToolbarStyles,
  sidePanelContentMenuIconStyles,
  sidePanelContentUserHeadingStyles,
} from "./SXSidePanelContent";

function SidePanelContent({ handleDrawerToggle, usersList }) {
  return (
    <div>
      <Toolbar sx={sidePanelContentToolbarStyles}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={sidePanelContentMenuIconStyles}
        >
          <MenuIcon />
        </IconButton>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={sidePanelContentUserHeadingStyles}
        >
          <GroupIcon />
          <Typography variant="h6" noWrap component="div">
            Users
          </Typography>
        </Stack>
      </Toolbar>
      <Divider />
      {usersList.length !== 0 ? (
        <UserList usersList={usersList} />
      ) : (
        <Typography
          sx={{ mt: 2 }}
          textAlign="center"
          variant="body2"
          noWrap
          component="div"
        >
          No Online Users
        </Typography>
      )}
    </div>
  );
}

export default SidePanelContent;
