import { Navigate, Route, Routes } from "react-router-dom";
import React, { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ChatPage from "./pages/chat page/index.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GlobalTheme from "./utils/GlobalTheme";
import PropTypes from "prop-types";
import Login from "./pages/auth/login/index.js";
import { Navbar, NoAuthNavbar } from "./layout/navbar";
import Register from "./pages/auth/register/index.js";

import Profile from "./pages/profile/index.js";
import NotFound from "./layout/NotFound.js";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { saveUser } from "./features/auth.js";

import { getAuth } from "firebase/auth";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import Notification from "./layout/Notification/index.js";
function App({ window }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const mode = useSelector((state) => state.theme.value);

  useMemo(() => {
    if (!localStorage.getItem("THEME")) {
      localStorage.setItem("THEME", "light");
    }
    if (mode) {
      localStorage.setItem("THEME", "dark");
    } else {
      localStorage.setItem("THEME", "light");
    }
  }, [mode]);

  const theme = useMemo(
    () => createTheme(GlobalTheme(localStorage.getItem("THEME"))),
    [mode]
  );

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("IS_AUTH", true);
        dispatch(saveUser(user));
      } else {
        localStorage.removeItem("IS_AUTH");
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        {location.pathname === "/" ? (
          <>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
          </>
        ) : (
          <NoAuthNavbar handleDrawerToggle={handleDrawerToggle} />
        )}

        <Routes>
          <Route
            path="/login"
            element={
              localStorage.getItem("IS_AUTH") ? <Navigate to="/" /> : <Login />
            }
          ></Route>
          <Route
            path="/register"
            element={
              localStorage.getItem("IS_AUTH") ? (
                <Navigate to="/" />
              ) : (
                <Register />
              )
            }
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ChatPage
                  handleDrawerToggle={handleDrawerToggle}
                  container={container}
                  mobileOpen={mobileOpen}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Notification />
      </>
    </ThemeProvider>
  );
}
App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default App;
