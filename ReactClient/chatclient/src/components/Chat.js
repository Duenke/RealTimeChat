import React from "react";
import { Button } from "react-bootstrap";
import ConnectedUsers from "./ConnectedUsers";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const Chat = ({ messages, sendMessage, leaveRoom, users }) => {
  return (
    <div>
      <div className="leave-room">
        <Button varient="danger" onClick={() => leaveRoom()}>
          Leave Room
        </Button>
      </div>
      <ConnectedUsers users={users} />
      <div className="chat">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
