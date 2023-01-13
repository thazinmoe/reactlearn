import React, { useState, Fragment, useEffect } from "react";
// import classes from "./TodoItem.module.css";

const PlanetItem = ({ title, id, updatePlanet }) => {
  console.log("updatePlanet",updatePlanet)
  const [editTitle, setEditTitle] = useState(title);
  const [show, setShow] = useState(false);
  let element = title;

  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("finishing up");
    };
  }, [show]);

  const handleUpdate = () => {
    setShow(false);
    updatePlanet({ id, title: editTitle });
  };
  if (show) {
    element = (
      <>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
      </>
    );
  }
  return (
    <li>
      <span>{element}</span>
      {/* <button onClick={deleteTodo.bind(this, id)} className={classes.crossX}>
        x
      </button> */}
      <button onClick={(e) => setShow(!show)}>
        Edit
      </button>
    </li>
  );
};

export default PlanetItem;
