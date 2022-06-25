import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ButtonBase, InputAdornment } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import { authBoxStyles } from "../auth/SXAuth";
import { setAlert } from "../../features/alert";
import {
  profileAvatarStyles,
  profileDialogAvatarStyles,
  profileDialogBoxStyles,
  profileListButtonStyles,
  profileListDeleteButtonStyles,
} from "./SXProfile";
import { useDispatch, useSelector } from "react-redux";
import { avatarLetters, titleCase } from "../../utils/constants";
import { db, auth } from "../../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const defaultValue = {
  firstName: "",
  lastName: "",
  photoURL: "",
};
const Profile = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [attachment, setAttachment] = useState();
  const [disableInput, setDisableInput] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (user) {
      const name = user.displayName.split(" ");
      setValue({ firstName: name[0], lastName: name[1] });
    }
  }, [user]);

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachment(files[0]);
  };

  const updateProfileFunc = async (e) => {
    e.preventDefault();
    try {
      setDisableInput(true);
      if (attachment) {
        if (user && user.photoURL) {
          const deleteRef = ref(storage, user && user.photoURL);
          await deleteObject(deleteRef);
          await updateProfile(auth.currentUser, {
            photoURL: "",
          });
        }
        const storageRef = ref(storage, `/images/${attachment.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, attachment);
        var url = await getDownloadURL(uploadTask.ref);
      }
      await updateProfile(auth.currentUser, {
        displayName: `${titleCase(value.firstName) +
          " " +
          titleCase(value.lastName)}`,

        photoURL: url || undefined,
      });

      await setDoc(doc(db, "users", user && user.uid), {
        displayName: `${titleCase(value.firstName) +
          " " +
          titleCase(value.lastName)}`,
        photoURL: url || "",
      });
    } catch (error) {
      dispatch(
        setAlert({
          message: "Your profile could not be updated. Please try again",
          type: "error",
        })
      );
      setValue(defaultValue);
    }
    setDisableInput(false);
    navigate("/profile");
    handleClose();
  };

  const deleteProfileImageFunc = async () => {
    setDisableInput(true);
    try {
      const deleteRef = ref(storage, user && user.photoURL);
      await deleteObject(deleteRef);
      await updateProfile(auth.currentUser, {
        photoURL: "",
      });

      await setDoc(doc(db, "users", user && user.uid), {
        displayName: user && user.displayName,
        photoURL: "",
      });
    } catch (error) {
      dispatch(
        setAlert({
          message: "Your profile could not be updated. Please try again",
          type: "error",
        })
      );
    }
    navigate("/profile");
    setDisableInput(false);
    handleClose();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Toolbar />

      <List sx={authBoxStyles}>
        <Box>
          <Avatar sx={profileAvatarStyles} src={user && user.photoURL}>
            {user && avatarLetters(user.displayName)}
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
        </Box>
        <ListItem
          sx={{
            mt: 2,
            ml: 2,
          }}
        >
          <PersonIcon sx={{ mr: 2 }} />

          <ListItemText primary="Name: " />

          <ListItemText
            primary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="subtitle1"
              >
                {user && user.displayName}
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ ml: 2 }}>
          <EmailIcon sx={{ mr: 2 }} />
          <ListItemText primary="Email: " />

          <ListItemText
            primary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="subtitle1"
              >
                {user && user.email}
              </Typography>
            }
          />
        </ListItem>
        <Button
          fullWidth
          sx={profileListButtonStyles}
          size="large"
          startIcon={<EditIcon />}
          variant="contained"
          onClick={handleOpen}
        >
          Edit
        </Button>
        <Button
          fullWidth
          sx={profileListButtonStyles}
          size="large"
          startIcon={<HomeIcon />}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <Box sx={profileDialogBoxStyles}>
            <DialogTitle>
              <Avatar sx={profileDialogAvatarStyles}>
                <EditIcon />
              </Avatar>{" "}
              Edit
            </DialogTitle>
            <Box
              component="form"
              onSubmit={updateProfileFunc}
              autoComplete="off"
              sx={{ mt: 2 }}
            >
              <DialogContent>
                <TextField
                  value={value && value.firstName}
                  required
                  fullWidth
                  label="First Name"
                  type="text"
                  id="firstname"
                  autoFocus
                  onChange={(event) =>
                    setValue({ ...value, firstName: event.target.value })
                  }
                />
                <TextField
                  value={value && value.lastName}
                  sx={{ mt: 1 }}
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  type="text"
                  onChange={(event) =>
                    setValue({ ...value, lastName: event.target.value })
                  }
                />
                <Box position="relative" height={98}>
                  <Box position="absolute" sx={{ width: "100%" }}>
                    <TextField
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <FileUploadIcon />
                          </InputAdornment>
                        ),
                      }}
                      margin="normal"
                      fullWidth
                      label="Upload your profile photo"
                      value={(attachment && attachment.name) || ""}
                      placeholder="Your profile photo"
                    />
                  </Box>
                  <ButtonBase
                    sx={{ width: "100%", height: "100%", overflow: "hidden" }}
                    component="label"
                    onKeyDown={(e) =>
                      e.keyCode === 32 && inputRef.current.click()
                    }
                  >
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleChange}
                    />
                  </ButtonBase>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={disableInput}
                  fullWidth
                  type="submit"
                  startIcon={<SendIcon />}
                  variant="contained"
                  sx={profileListButtonStyles}
                >
                  Submit
                </Button>
                {user && user.photoURL && (
                  <Button
                    disabled={disableInput}
                    fullWidth
                    onClick={deleteProfileImageFunc}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={profileListDeleteButtonStyles}
                    color="error"
                  >
                    Remove Image
                  </Button>
                )}
              </DialogActions>
            </Box>
          </Box>
        </Dialog>
      </List>
    </Container>
  );
};

export default Profile;
