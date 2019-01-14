import React, { Component } from "react";
import Navbar, { NAVBAR } from "./Navbar";
import {GitWallContext, gitWall} from './AppContext/GitWallContext';
import GitContributionComponentMain from "./GitContributionComponent/GitContributionComponentMain";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNav: NAVBAR.TEXT,
      gitWallObject: gitWall
    };
    this._selectNav = this._selectNav.bind(this);
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
        <GitWallContext.Provider value={{gitWallObject: this.state.gitWallObject}}>
          <GitContributionComponentMain />
        </GitWallContext.Provider>
        

      </>
    );
  }
}

export default App;
