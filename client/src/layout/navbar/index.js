import React, { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import ModeSwitch from "../../styled-components/ModeSwitch";
import MenuItem from "@mui/material/MenuItem";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router-dom";
import {
  navBarAppBarStyles,
  navBarAvatarIconButtonStyles,
  navBarAvatarStyles,
  navBarBoxStyles,
  navBarIconButtonStyles,
  navBarStackStyles,
  navBarSwitchStyles,
  noAuthNavBarAppBarStyles,
} from "./SXNavbar";
import { avatarLetters } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../features/alert";
import { changeTheme } from "../../features/theme";
import { io } from "socket.io-client";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
export const Navbar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const socket = useRef(io(process.env.REACT_APP_SOCKET_URL));
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logoutFunc = async () => {
    setAnchorElUser(null);
    try {
      await signOut(auth);
      socket.current.emit("signout", { userId: user && user.uid });
      navigate("/login");
    } catch (error) {
      dispatch(
        setAlert({
          message: "An error occurred while signing you out. Please try again",
          type: "error",
        })
      );
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={navBarBoxStyles}>
      <AppBar position="fixed" sx={navBarAppBarStyles}>
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={navBarIconButtonStyles}
          >
            <MenuIcon />
          </IconButton>

          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={navBarStackStyles}
          >
            <ForumIcon sx={{ m: 1 }} />
            <Typography variant="h6" component="div">
              Chat App
            </Typography>
          </Stack>
          <ModeSwitch
            onChange={(event) => dispatch(changeTheme(event.target.checked))}
            sx={navBarSwitchStyles}
            checked={localStorage.getItem("THEME") === "dark"}
          />

          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
              sx={navBarAvatarIconButtonStyles}
            >
              <Avatar
                sx={navBarAvatarStyles}
                alt={user && user.displayName}
                src={user && user.photoURL}
              >
                {user && avatarLetters(user.displayName)}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  setAnchorElUser(null);
                  socket.current.emit("signout", { userId: user && user.uid });
                  navigate("/profile");
                }}
              >
                Edit Profile
              </MenuItem>
              <MenuItem onClick={logoutFunc}>Logout</MenuItem>
            </Menu>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export const NoAuthNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);
  const socket = useRef(io(process.env.REACT_APP_SOCKET_URL));
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigateToProfile = () => {
    setAnchorElUser(null);
    socket.current.emit("signout", { userId: user && user.uid });
    navigate("/profile");
  };
  const logoutFunc = async () => {
    setAnchorElUser(null);
    try {
      await signOut(auth);
      socket.current.emit("signout", { userId: user && user.uid });
      navigate("/login");
    } catch (error) {
      dispatch(
        setAlert({
          message: "An error occurred while signing you out. Please try again",
          type: "error",
        })
      );
    }
  };

  return (
    <Box sx={navBarBoxStyles}>
      <AppBar position="fixed" sx={noAuthNavBarAppBarStyles}>
        <Toolbar disableGutters>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={navBarStackStyles}
          >
            <ForumIcon sx={{ m: 1 }} />
            <Typography variant="h6" component="div">
              Chat App
            </Typography>
          </Stack>
          <ModeSwitch
            onChange={(event) => dispatch(changeTheme(event.target.checked))}
            sx={navBarSwitchStyles}
            checked={localStorage.getItem("THEME") === "dark"}
          />
          {user && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
                sx={navBarAvatarIconButtonStyles}
              >
                <Avatar
                  sx={navBarAvatarStyles}
                  alt={user.displayName}
                  src={user.photoURL}
                >
                  {avatarLetters(user.displayName)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem onClick={navigateToProfile}>Edit Profile</MenuItem>
                <MenuItem onClick={logoutFunc}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
