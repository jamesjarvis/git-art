import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="tabs is-centered">
        <ul>
          <li>
            <NavLink to={`/${NAVBAR.TEXT}`} activeClassName={"is-active"}>
              <span className="icon">
                <i className="fas fa-font" aria-hidden="true" />
              </span>
              <span>{NAVBAR.TEXT}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${NAVBAR.IMAGE}`} activeClassName={"is-active"}>
              <span className="icon">
                <i className="fas fa-image" aria-hidden="true" />
              </span>
              <span>{NAVBAR.IMAGE}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${NAVBAR.DRAW}`} activeClassName={"is-active"}>
              <span className="icon">
                <i className="fas fa-pencil-alt" aria-hidden="true" />
              </span>
              <span>{NAVBAR.DRAW}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export const NAVBAR = {
  TEXT: "Text",
  IMAGE: "Image",
  DRAW: "Draw"
};

export default Navbar;
