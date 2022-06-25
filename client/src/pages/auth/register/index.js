import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  authAvatarStyles,
  authBoxStyles,
  authButtonStyles,
  authLinkStyles,
  authMargin,
} from "../SXAuth";
import { titleCase } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../features/alert";
const defaultValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [value, setValue] = React.useState(defaultValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      await updateProfile(auth.currentUser, {
        displayName: `${titleCase(value.firstName) +
          " " +
          titleCase(value.lastName)}`,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        displayName: `${titleCase(value.firstName) +
          " " +
          titleCase(value.lastName)}`,
      });

      navigate("/");
    } catch (error) {
      dispatch(
        setAlert({
          message:
            "An error occurred. Please check your credentials and try again",
          type: "error",
        })
      );
    }
    setValue(defaultValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={authBoxStyles}>
        <Avatar sx={{ ...authAvatarStyles, marginTop: "18%" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={registerFunc}
          sx={authMargin}
          autoComplete="off"
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={value.firstName}
                required
                fullWidth
                autoCapitalize="on"
                onChange={(event) =>
                  setValue({ ...value, firstName: event.target.value })
                }
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={value.lastName}
                label="Last Name"
                autoCapitalize="on"
                onChange={(event) =>
                  setValue({ ...value, lastName: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={value.email}
                label="Email Address"
                onChange={(event) =>
                  setValue({ ...value, email: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={value.password}
                label="Password"
                type="password"
                onChange={(event) =>
                  setValue({ ...value, password: event.target.value })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            startIcon={<AppRegistrationIcon />}
            variant="contained"
            sx={authButtonStyles}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                sx={authLinkStyles}
                onClick={() => navigate("/")}
                variant="body2"
              >
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
