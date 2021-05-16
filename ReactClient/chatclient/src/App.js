import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import Chat from "./components/Chat";
import Lobby from "./components/Lobby";

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44330/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((prevMessages) => [...prevMessages, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(() => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });

      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveRoom = async () => {
    try {
      await connection.stop();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h2>ChatClient</h2>
      {/* <hr className="line" /> */}
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          leaveRoom={leaveRoom}
          users={users}
        />
      )}
    </div>
  );
};

export default App;
