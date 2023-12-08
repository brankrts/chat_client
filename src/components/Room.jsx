import React from "react";

const Room = ({
  userName,
  room,
  setUserName,
  setRoom,
  setChatScreen,
  socket,
}) => {
  const sendRoom = () => {
    socket.emit("room", room);
    setChatScreen(true);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[350px] bg-indigo-500 flex flex-col space-y-4 p-3 rounded-lg">
        <h1 className=" font-bold text-2xl text-center my-4 text-white">
          Welcome to chat
        </h1>
        <input
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <div
          onClick={sendRoom}
          className=" bg-indigo-700 text-white select-none cursor-pointer h-12 pt-2 text-xl text-center rounded-lg p-3 hover:bg-indigo-900 transition-all ease-linear duration-300"
        >
          Chat!!
        </div>
      </div>
    </div>
  );
};

export default Room;
