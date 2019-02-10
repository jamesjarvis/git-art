import React, { Component } from "react";
import Navbar, { NAVBAR } from "./Nav/Navbar";
import SelectColour from "./Draw/SelectColour";
import TextInput from "./Text/TextInput";
import { getStartDate } from "../utils/convert-to-bash";
import { blankWall, updateWall, mixWalls } from "../utils/wallUtils";
import moment from "moment";
import Wall from "../components/GitWall/Wall";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textWall: [],
      drawWall: blankWall(),
      allWall: blankWall(),
      drawValue: 0
    };
    this._selectNav = this._selectNav.bind(this);
    this._setDrawValue = this._setDrawValue.bind(this);

    //New code
    this._updateDrawWall = this._updateDrawWall.bind(this);
    this._updateTextWall = this._updateTextWall.bind(this);
    this._updateAllWall = this._updateAllWall.bind(this);

    this._clearAllWall = this._clearAllWall.bind(this);
  }

  _updateDrawWall(x, y, drawValue) {
    const drawWall = updateWall(x, y, drawValue, this.state.drawWall);
    const allWall = mixWalls(blankWall(), [this.state.textWall, drawWall]);
    this.setState({
      drawWall,
      allWall
    });
  }
  _updateTextWall(textWall) {
    const allWall = mixWalls(blankWall(), [this.state.drawWall, textWall]);
    this.setState({
      textWall,
      allWall: allWall
    });
  }
  _updateAllWall() {
    const allWall = mixWalls(blankWall(), [
      this.state.textWall,
      this.state.drawWall
    ]);
    this.setState({
      allWall
    });
  }

  _clearAllWall() {
    this.setState({
      textWall: [],
      drawWall: blankWall(),
      allWall: blankWall()
    });
  }

  _setDrawValue(value) {
    this.setState({
      drawValue: value
    });
  }
  _selectNav(navbarTab) {
    //SHOULD BE REDONE
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
    return (
      <Router>
        <>
          <CreateHeader />
          <Navbar />
          <Switch>
            <Route
              path={`/${NAVBAR.TEXT}`}
              exact
              render={() => <TextInput updateWall={this._updateTextWall} />}
            />
            <Route
              path={`/${NAVBAR.DRAW}`}
              exact
              render={() => (
                <SelectColour
                  setDrawValue={this._setDrawValue}
                  drawValue={this.state.drawValue}
                />
              )}
            />
            <Redirect to={`/${NAVBAR.TEXT}`} />
          </Switch>
          <Wall
            allWall={this.state.allWall}
            startDate={moment(getStartDate())}
            drawValue={this.state.drawValue}
            updateDrawWall={this._updateDrawWall}
            reset={this._clearAllWall}
          />
        </>
      </Router>
    );
  }
}

export default App;
