import React, { useEffect, useRef, useState } from "react";

import { Box, Toolbar, Tooltip } from "@mui/material";
import { Stack, Button, InputBase } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";
import ChatMessageList from "../../components/chats/chat message list";

import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import SidePanel from "../../layout/side panel";
import {
  boxStyles,
  messageInputStyles,
  sendMessageButtonStyles,
  uploadButtonStyles,
} from "./SXMessageInput";
import { concatUID } from "../../utils/constants";
import { addSelectedUserProfile } from "../../features/chat";
import { setAlert } from "../../features/alert";
const ChatPage = ({ handleDrawerToggle, mobileOpen, container }) => {
  const socket = useRef(io(process.env.REACT_APP_SOCKET_URL));
  const { selectedUser } = useSelector((state) => state.chat.value);
  const user = useSelector((state) => state.auth.value);
  const [usersList, setUsersList] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [disableInput, setDisableInput] = useState(false);
  const [content, setContent] = useState("");
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        timestamp: data.timestamp,
      });
    });
  }, []);

  useEffect(() => {
    if (!usersList.some((currentUser) => currentUser.userId === selectedUser)) {
      dispatch(addSelectedUserProfile(""));
    }
  }, [usersList]);

  useEffect(() => {
    if (arrivalMessage && arrivalMessage.senderId === selectedUser) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage, selectedUser]);

  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user.uid);
      socket.current.on("getUsers", (users) => {
        const usersList = [];

        users.forEach((onlineUser) => {
          const getUserDetails = async () => {
            const usersRef = collection(db, "users");
            const docSnap = await getDocs(usersRef);

            docSnap.forEach((doc) => {
              if (onlineUser.userId === doc.id) {
                usersList.push({ ...doc.data(), userId: doc.id });
                if (onlineUser.userId === user.uid) {
                  const usersListIndex = usersList.indexOf(onlineUser.userId);
                  usersList.splice(usersListIndex, 1);
                }
                setUsersList(usersList);
              }
            });
          };

          getUserDetails();
        });
      });
    }
  }, [user, selectedUser]);

  useEffect(() => {
    const getDBMessages = async () => {
      try {
        const messagesRef = doc(
          db,
          "message",
          concatUID(user && user.uid, selectedUser)
        );
        const docSnap = await getDoc(messagesRef);
        const selectedUserMessages = [...docSnap.data().messages];
        setMessages(selectedUserMessages);
      } catch (error) {
        setMessages([]);
      }
    };
    getDBMessages();
  }, [user, selectedUser]);

  const onMessage = async (e) => {
    e.preventDefault();
    try {
      setDisableInput(true);

      const messagesRef = doc(
        db,
        "message",
        concatUID(user && user.uid, selectedUser)
      );
      await setDoc(
        messagesRef,
        {
          messages: arrayUnion({
            senderId: user && user.uid,
            receiverId: selectedUser,
            content,
            timestamp: Date.now(),
          }),
        },
        { merge: true }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: user && user.uid,
          receiverId: selectedUser,
          content,
          timestamp: Date.now(),
        },
      ]);
      socket.current.emit("sendMessage", {
        senderId: user && user.uid,
        receiverId: selectedUser,
        content,
        timestamp: Date.now(),
      });
    } catch (error) {
      dispatch(
        setAlert({
          message:
            "An error occurred while sending the message. Please try again",
          type: "error",
        })
      );
    }
    setDisableInput(false);
    setContent("");
  };

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <>
      <Box>
        <SidePanel
          usersList={usersList}
          container={container}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
        <Toolbar />
        <Toolbar />
        {selectedUser !== "" && (
          <div ref={scrollRef}>
            <ChatMessageList messages={messages} />

            <Box onSubmit={onMessage} component="form" sx={boxStyles}>
              <Stack direction="row">
                <input
                  style={{ display: "none" }}
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                />
                <Tooltip title="Coming Soon!" placement="top" arrow>
                  <Button
                    disabled={disableInput}
                    sx={uploadButtonStyles}
                    size="large"
                    variant="outlined"
                  >
                    <FileUploadIcon />
                  </Button>
                </Tooltip>
                <InputBase
                  disabled={disableInput}
                  required
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  sx={messageInputStyles}
                  variant="filled"
                  placeholder="Enter your message here..."
                  id="fullWidth"
                />

                <Button
                  disabled={disableInput}
                  type="submit"
                  sx={sendMessageButtonStyles}
                  size="large"
                  variant="contained"
                >
                  <SendIcon />
                </Button>
              </Stack>
            </Box>
          </div>
        )}
      </Box>
    </>
  );
};

export default ChatPage;
