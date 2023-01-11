import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import socketIo from "socket.io-client";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";
const ENDPOINT = "https://cchat-backend-lfnl.onrender.com/";
let socket;
const Chat = () => {
  const location = useLocation();
  const { name } = location.state;
  //
  const [input, setInput] = useState("");
  const [id, setId] = useState();
  const [messages, setMessages] = useState([]);
  //
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // alert("connected");
      setId(socket.id);
    });
    socket.on("welcome", (data) => {
      return setMessages((m) => {
        const modarr = [...m];
        modarr.push(data);
        return modarr;
      });
    });

    socket.emit("joined", { name });
    return () => {
      socket.off();
    };
  }, [name]);
  const send = () => {
    socket.emit("message", { id: id, input: input });
    setInput("");
  };

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  //
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <ReactScrollToBottom className="chatBox">
          {messages.map(
            (data, i) =>
              data.input !== "" && (
                <Message
                  key={i}
                  user={data.user === name ? "" : data.user}
                  message={data.input}
                />
              )
          )}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            type="text"
            className="chatInput"
            name="message"
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
