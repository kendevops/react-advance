import React, { useState } from "react";

const UseStateObject = () => {
  const [data, setData] = useState({
    name: "Kenneth",
    age: 27,
    message: "Where you feast is where you are gloryified",
  });

  const changeMessage = () => {
    setData({...data, message: "It's been a nice time here"})
  }
  return (<>
  <h2>{data.name}</h2>
  <h4>{data.age}</h4>
  <h4>{data.message}</h4>
  <button onClick={changeMessage}>Change Message</button>
  </>);
};

export default UseStateObject;
