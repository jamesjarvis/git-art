import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="tabs is-centered">
        <ul>
          <li
            className={
              this.props.selectedNav === NAVBAR.TEXT ? "is-active" : ""
            }
          >
            <a
              onClick={() => this.props.navbarTabOnClick(NAVBAR.TEXT)}
              href="#"
            >
              <span className="icon">
                <i className="fas fa-font" aria-hidden="true" />
              </span>
              <span>{NAVBAR.TEXT}</span>
            </a>
          </li>
          <li
            className={
              this.props.selectedNav === NAVBAR.IMAGE ? "is-active" : ""
            }
          >
            <a
              onClick={() => this.props.navbarTabOnClick(NAVBAR.IMAGE)}
              href="#"
            >
              <span className="icon">
                <i className="fas fa-image" aria-hidden="true" />
              </span>
              <span>{NAVBAR.IMAGE}</span>
            </a>
          </li>
          <li
            className={
              this.props.selectedNav === NAVBAR.DRAW ? "is-active" : ""
            }
          >
            <a
              onClick={() => this.props.navbarTabOnClick(NAVBAR.DRAW)}
              href="#"
            >
              <span className="icon">
                <i className="fas fa-pencil-alt" aria-hidden="true" />
              </span>
              <span>{NAVBAR.DRAW}</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export const NAVBAR = {
  TEXT: "Text",
  IMAGE: "Image",
  DRAW: "Draw"
};

export default Navbar;
