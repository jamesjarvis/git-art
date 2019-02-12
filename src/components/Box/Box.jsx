import React from "react";
import "./Box.css";

const Box = props => {
  const className = props.className ? props.className : "section";
  return (
    <section className={className}>
      <h3>{props.title}</h3>
      {props.children}
    </section>
  );
};

export default Box;
