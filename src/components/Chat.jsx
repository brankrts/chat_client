import React, { useEffect, useState } from "react";

const Chat = ({ socket, userName, room }) => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    const messageContent = {
      userName: userName,
      message: message,
      room: room,
      date: new Date()
        .toISOString()
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, ""),
    };
    await socket.emit("message", messageContent);
    setMessageList((oldList) => [...oldList, messageContent]);
    setMessage("");
  };
  useEffect(() => {
    socket.on("return", (message) => {
      setMessageList((oldList) => [...oldList, message]);
    });
  }, [socket]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className=" w-1/3 h-[600px] bg-indigo-300 relative">
        <div className=" w-full h-16 bg-gray-700"></div>
        <div className=" w-full h-[400px] overflow-y-auto overflow-x-hidden">
          {messageList &&
            messageList.map((msg, index) => (
              <div
                key={index}
                className={`${
                  userName === msg.userName ? "flex justify-end" : ""
                }`}
              >
                <div
                  className={`${
                    userName === msg.userName ? " bg-green-600" : "bg-blue-600"
                  } w-2/3 h-auto p-2 text-white m-2 rounded-xl rounded-br-none flex flex-col break-all`}
                >
                  <div className="whitespace-normal">
                    <p className=" block">{msg.message}</p>
                  </div>
                  <div className=" w-full flex justify-end text-xs text-gray-400 font-bold mt-2">
                    {msg.userName.toUpperCase() + " --> " + msg.date}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className=" absolute bottom-0 left-0 w-full p-1">
          <input
            className="w-3/4 h-12 border p-3 outline-none"
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-indigo-600 text-white h-12 hover:bg-indigo-700 transition-all duration-300 ease-linear"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
