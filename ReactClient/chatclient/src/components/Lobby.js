import React, { useState } from "react";
import { Form, Button, FormControl, FormGroup } from "react-bootstrap";

const Lobby = ({ joinRoom }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();

  return (
    <Form
      className="lobby"
      onSubmit={(e) => {
        e.preventDefault();
        joinRoom(user, room);
      }}
    >
      <FormGroup>
        <FormControl
          placeholder="name"
          onChange={(e) => setUser(e.target.value)}
        />
        <FormControl
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        />
      </FormGroup>
      <Button variant="success" type="submit" disabled={!user || !room}>
        Join
      </Button>
    </Form>
  );
};

export default Lobby;
