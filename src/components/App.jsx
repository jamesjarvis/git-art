import React, { Component } from "react";
import SelectColour from "./Draw/SelectColour";
import TextInput from "./Text/TextInput";
import { getStartDate } from "../utils/convertToBash";
import { blankWall, updateWall, mixWalls } from "../utils/wallUtils";
import moment from "moment";
import Wall from "../components/GitWall/Wall";
import Header from "../components/Header/Header";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textWall: [],
      drawWall: blankWall(),
      allWall: blankWall(),
      drawValue: 0
    };
    this._setDrawValue = this._setDrawValue.bind(this);

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

  render() {
    return (
      <>
        <Header title="Git Art" description="Make your GitHub pretty" />
        <TextInput updateWall={this._updateTextWall} />
        <SelectColour
          setDrawValue={this._setDrawValue}
          drawValue={this.state.drawValue}
        />
        <Wall
          allWall={this.state.allWall}
          startDate={moment(getStartDate())}
          drawValue={this.state.drawValue}
          updateDrawWall={this._updateDrawWall}
          reset={this._clearAllWall}
        />
      </>
    );
  }
}

export default App;
