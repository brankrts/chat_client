import Room from "./components/Room";
import "./App.css";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://88.228.225.116");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatScreen] = useState(false);
  return (
    <div className="App">
      {chatScreen ? (
        <Chat userName={userName} room={room} socket={socket} />
      ) : (
        <Room
          userName={userName}
          room={room}
          setUserName={setUserName}
          setRoom={setRoom}
          setChatScreen={setChatScreen}
          socket={socket}
        />
      )}
    </div>
  );
}

export default App;
