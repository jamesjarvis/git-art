import React from "react";
import "./Header.css";

const Header = props => (
  <header>
    <div className="inner">
      <h1 className="title">{props.title}</h1>
      <h2 className="subtitle">{props.description}</h2>
    </div>
  </header>
);

export default Header;
