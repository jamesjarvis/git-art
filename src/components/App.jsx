import React, { Component } from "react";
import Navbar, { NAVBAR } from "./Navbar";
import { GitWallContext, gitWall } from "./AppContext/GitWallContext";
import GitContribution from "./GitContribution/GitContribution";
import SelectColour from "./Draw/SelectColour";
import TextInput from "./Text/TextInput";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNav: NAVBAR.TEXT,
      gitWallObject: gitWall,
      drawValue: 0
    };
    this._selectNav = this._selectNav.bind(this);
    this._setDrawValue = this._setDrawValue.bind(this);
  }
  _setDrawValue(value) {
    console.log(value);
    this.setState({
      drawValue: value
    });
  }
  _selectNav(navbarTab) {
    this.setState({
      selectedNav: navbarTab
    });
  }
  render() {
    function CreateHeader() {
      return (
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Git Art</h1>
              <h2 className="subtitle">Make your github pretty</h2>
            </div>
          </div>
        </section>
      );
    }
    console.log(this.state.gitWallObject);
    return (
      <>
        <CreateHeader />
        <Navbar
          selectedNav={this.state.selectedNav}
          navbarTabOnClick={this._selectNav}
        />

        <GitWallContext.Provider
          value={{
            ...this.state,
            setDrawValue: this._setDrawValue
          }}
        >
          {this.state.selectedNav == NAVBAR.DRAW && <SelectColour />}
          {this.state.selectedNav == NAVBAR.TEXT && <TextInput />}
          <GitContribution />
        </GitWallContext.Provider>
      </>
    );
  }
}

export default App;
