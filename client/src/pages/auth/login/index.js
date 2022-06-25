import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Toolbar } from "@mui/material";
import {
  authAvatarStyles,
  authBoxStyles,
  authButtonStyles,
  authLinkStyles,
  authMargin,
  dialogforgotPasswordSubmitButtonStyles,
} from "../SXAuth";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../firebase-config";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../features/alert";
const defaultValue = {
  email: "",
  password: "",
};
export default function Login() {
  const [value, setValue] = useState(defaultValue);
  const [resetEmail, setResetEmail] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loginFunc = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);

      navigate("/");
    } catch (error) {
      dispatch(
        setAlert({
          message: "Check your credentials and try again",
          type: "error",
        })
      );
      setValue(defaultValue);
    }
  };

  const passwordResetFunc = async () => {
    try {
      setDisableInput(true);
      await sendPasswordResetEmail(auth, resetEmail);
      dispatch(
        setAlert({
          message:
            "The reset link has been sent to your email. Check your spam",
          type: "success",
        })
      );
      handleClose();
    } catch (error) {
      dispatch(
        setAlert({
          message: "An error occurred. Please check your email and try again",
          type: "error",
        })
      );
    }
    setResetEmail("");
    setDisableInput(false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Toolbar />

        <Box sx={authBoxStyles}>
          <Avatar sx={authAvatarStyles}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={loginFunc}
            autoComplete="off"
            sx={authMargin}
          >
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={value.email}
              onChange={(event) =>
                setValue({ ...value, email: event.target.value })
              }
              autoFocus
            />
            <TextField
              sx={authMargin}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={value.password}
              onChange={(event) =>
                setValue({ ...value, password: event.target.value })
              }
            />
            <Button
              type="submit"
              startIcon={<LoginIcon />}
              fullWidth
              variant="contained"
              sx={authButtonStyles}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link sx={authLinkStyles} onClick={handleOpen} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  sx={authLinkStyles}
                  onClick={() => navigate("/register")}
                  variant="body2"
                >
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "text.primary",
                    }}
                  >
                    <LockResetIcon />
                  </Avatar>{" "}
                  Enter Registered Email
                </DialogTitle>

                <DialogContent>
                  <TextField
                    sx={{ mt: 1 }}
                    value={resetEmail}
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    id="email"
                    autoFocus
                    onChange={(event) => setResetEmail(event.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={disableInput}
                    startIcon={<SendIcon />}
                    fullWidth
                    onClick={passwordResetFunc}
                    sx={dialogforgotPasswordSubmitButtonStyles}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
