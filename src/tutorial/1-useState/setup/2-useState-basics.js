import React, { useState } from "react";

const UseStateBasics = () => {
  const [title, setTitle] = useState("random title");
  const handleClick = (e) => {
    if (title === "random title") {
      setTitle("hello people");
    } else {
      setTitle("random title");
    }
  };
  return (
    <>
      <h2>{title}</h2>
      <button className="btn" onClick={handleClick}>
        Change Title
      </button>
    </>
  );
};

export default UseStateBasics;
