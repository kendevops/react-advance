import React, { useState } from "react";
import { data } from "../../../data";

const UseStateArray = () => {
  const [people, setPeople] = useState(data);
  return (
    <>
      {people.map((person) => {
        return (
          <div key={person.id} className="item">
            <h4>{person.name}</h4>
          </div>
        );
      })}
      <button onClick={() => setPeople([])} className="btn">
        Clear All
      </button>
    </>
  );
};

export default UseStateArray;
