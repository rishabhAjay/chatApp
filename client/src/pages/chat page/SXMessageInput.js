import { drawerWidth } from "../../utils/constants";

export const boxStyles = {
  width: "100%",
  position: "fixed",
  bottom: 0,
  ml: { sm: `${drawerWidth}px` },
  mb: 0.1,
};

export const uploadButtonStyles = {
  bgcolor: "tertiary.main",
  color: "text.primary",
  border: "1px solid primary.main",
  "&:hover": {
    bgcolor: "tertiary.main",
    color: "text.primary",
    border: "1px solid primary.main",
    opacity: 0.9,
  },
};

export const messageInputStyles = {
  p: 2,
  width: "75%",
  backgroundColor: "secondary.main",
};

export const sendMessageButtonStyles = {
  bgcolor: "primary.main",
  color: "text.primary",
  "&:hover": {
    bgcolor: "primary.main",
    color: "text.primary",
    opacity: 0.9,
  },
};
