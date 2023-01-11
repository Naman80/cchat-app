import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./join.css";

const Join = () => {
  const [input, setinput] = useState("");
  function onInputChange(e) {
    setinput(e.target.value);
  }
  return (
    <div className="joinPage">
      <div className="joinContainer">
        {/* <img src="" alt="" /> */}
        <h1 className="chat_title">C CHAT</h1>
        <hr className="mark_line" />
        <input
          type="text"
          className="joinInput"
          placeholder="Enter your name"
          value={input}
          name="inputs"
          onChange={onInputChange}
        />
        <Link
          onClick={(event) => (input === "" ? event.preventDefault() : null)}
          to="/chat"
          state={{ name: input }}
          className="link"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Join;
