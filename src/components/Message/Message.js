import React from "react";
import "./message.css";
const Message = (props) => {
  const { user, message } = props;

  if (user) {
    return <div className="messageBox left">{`${user}: ${message}`}</div>;
  } else {
    return <div className="messageBox right">{`You: ${message}`}</div>;
  }
};
export default Message;
