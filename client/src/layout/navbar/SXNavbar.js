import { drawerWidth } from "../../utils/constants";

export const navBarBoxStyles = { flexGrow: 1 };

export const navBarAppBarStyles = {
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
  backgroundColor: "#400303",
  color: "white",
};

export const navBarIconButtonStyles = {
  mr: 1,
  ml: 0.5,
  display: { sm: "none" },
};

export const navBarStackStyles = {
  flexGrow: 1,
  ml: { md: 3, lg: 3 },
};

export const navBarSwitchStyles = { mr: { md: 2, lg: 2 } };

export const navBarAvatarIconButtonStyles = { mr: { md: 2, lg: 2 } };

export const navBarAvatarStyles = {
  bgcolor: "primary.main",
  color: "text.primary",
};

export const noAuthNavBarAppBarStyles = {
  width: { sm: "100%" },
  backgroundColor: "#400303",
  color: "white",
};
