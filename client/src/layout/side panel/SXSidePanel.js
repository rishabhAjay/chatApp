import { drawerWidth } from "../../utils/constants";
export const sidePanelBoxStyles = {
  width: { sm: drawerWidth },
  flexShrink: { sm: 0 },
};

export const sidePanelResponsiveDrawerStyles = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
};

export const sidePanelDrawerStyles = {
  display: { xs: "none", sm: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
};
