import React from "react";
import { Grid, Toolbar } from "@mui/material";
import { TextMessage } from "../chat messages";
import { chatMessageListGridStyles } from "./SXChatMessageList";

const ChatMessageList = ({ messages }) => {
  messages.sort(function(x, y) {
    return x.timestamp - y.timestamp;
  });

  return (
    <>
      <Grid sx={chatMessageListGridStyles} gap={4} container>
        {messages &&
          messages.map((element, index) => (
            <TextMessage
              key={element.timestamp}
              senderId={element.senderId}
              receiverId={element.receiverId}
              content={element.content}
              timestamp={element.timestamp}
            />
          ))}
        {/* <ImageMessage /> */}
      </Grid>
      <Toolbar />
      <Toolbar />
    </>
  );
};

export default ChatMessageList;
