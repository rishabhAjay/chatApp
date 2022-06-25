import React from "react";

import { Drawer, Box } from "@mui/material";
import SidePanelContent from "../side panel content";
import {
  sidePanelBoxStyles,
  sidePanelDrawerStyles,
  sidePanelResponsiveDrawerStyles,
} from "./SXSidePanel";
const SidePanel = ({
  container,
  mobileOpen,
  handleDrawerToggle,
  usersList,
}) => {
  return (
    <>
      <Box component="nav" sx={sidePanelBoxStyles} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={sidePanelResponsiveDrawerStyles}
        >
          <SidePanelContent
            usersList={usersList}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
        <Drawer variant="permanent" sx={sidePanelDrawerStyles} open>
          <SidePanelContent
            usersList={usersList}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
      </Box>
    </>
  );
};

export default SidePanel;
