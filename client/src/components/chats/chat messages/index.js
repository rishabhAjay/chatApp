import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputBase,
  Stack,
  Avatar,
  FormHelperText,
  Modal,
  Box,
} from "@mui/material";
import {
  chatBubbleStyles,
  imageBoxStyles,
  imageModalStyles,
  messageAvatarStyles,
  modalStyles,
} from "./SXChatMessages";
import { avatarLetters } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import ReactTimeAgo from "react-time-ago";
const user = {
  name: "Natsume Takashi",
};
const message = {
  sender: "Natsume Takashi",
  content: "jsdfhsdlfhsl;fhshflkhfsflhsdfhskhfha",
};

const image = {
  sender: "Travis Howard",
  content:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
};

const defaultValue = {
  displayName: "",
  photoURL: "",
};
export const TextMessage = ({ senderId, content, timestamp }) => {
  const user = useSelector((state) => state.auth.value);
  const [userDetails, setUserDetails] = useState(defaultValue);

  useEffect(() => {
    const getUserDetails = async () => {
      const usersRef = doc(db, "users", senderId);
      const docSnap = await getDoc(usersRef);
      setUserDetails({
        displayName: docSnap.data().displayName,
        photoURL: docSnap.data().photoURL,
      });
    };
    getUserDetails();
  }, []);

  return (
    <Grid item xs={12}>
      <Stack
        direction={"row"}
        flexDirection={user && user.uid === senderId && "row-reverse"}
        alignItems="center"
      >
        <Avatar
          sx={messageAvatarStyles}
          alt={userDetails && userDetails.displayName}
          src={userDetails && userDetails.photoURL}
        >
          {userDetails && avatarLetters(userDetails.displayName)}
        </Avatar>
        <FormControl variant="standard">
          <InputBase
            autoFocus
            readOnly
            sx={{
              ...chatBubbleStyles,
              bgcolor:
                user && user.uid === senderId
                  ? "secondary.main"
                  : "primary.main",
            }}
            id="component-helper"
            aria-describedby="component-helper-text"
            value={content}
            multiline
          />
          <FormHelperText
            sx={{ textAlign: senderId === user && user.uid && "right" }}
            id="component-helper-text"
          >
            Sent <ReactTimeAgo date={timestamp} timeStyle="round-minute" /> by{" "}
            {userDetails && userDetails.displayName}
          </FormHelperText>
        </FormControl>
      </Stack>
    </Grid>
  );
};

export const ImageMessage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid item xs={12}>
      <Stack
        direction={"row"}
        flexDirection={image.sender === user.name && "row-reverse"}
        alignItems="center"
      >
        <Avatar
          sx={messageAvatarStyles}
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
        >
          {avatarLetters(message.sender)}
        </Avatar>
        <FormControl variant="standard">
          <Box
            component="img"
            sx={{
              ...imageBoxStyles,
              borderColor:
                image.sender === user.name ? "secondary.main" : "primary.main",
            }}
            onClick={handleOpen}
            alt="The house from the offer."
            src={image.content}
          />
          <FormHelperText
            sx={{ textAlign: image.sender === user.name && "right" }}
            id="component-helper-text"
          >
            Some important helper text
          </FormHelperText>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyles}>
              <Box
                component="img"
                sx={imageModalStyles}
                alt="The house from the offer."
                src={image.content}
              />{" "}
            </Box>
          </Modal>
        </FormControl>
      </Stack>
    </Grid>
  );
};
