import React, {useState} from "react";

const ErrorExample = () => {
  const [title, setTitle] = useState("Random Title");
  const handleClick = (e) => {
    e.target.setTitle = "Hello People";
    console.log(title);
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

export default ErrorExample;
