import React from "react";
import WallBox from "./WallBox";
import moment from "moment";
import "./Wall.css";
import { generateBash } from "../../utils/convertToBash";
import Box from "../Box/Box";
import { saveAs } from "file-saver";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMouseDown: false,
      export: "",
      value: 4
    };
    this.export = this.export.bind(this);
    this.reset = this.reset.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.saveScript = this.saveScript.bind(this);
  }

  updateInputValue(event) {
    const {
      target: { value }
    } = event;

    this.setState({
      value: Math.min(value, 50)
    });
  }

  reset() {
    this.setState({
      export: ""
    });
    this.props.reset();
  }

  export() {
    this.setState({
      export: generateBash(
        this.props.allWall,
        Math.max(Math.round(this.state.value / 4), 1)
      )
    });
  }

  saveScript() {
    let blob = new Blob([this.state.export], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "git-art.sh");
  }

  render() {
    let boxDate = moment(this.props.startDate);
    boxDate.subtract(1, "days");
    return (
      <Box title="Your new wall" className="box">
        <div
          className="box"
          onMouseDown={() => {
            this.setState({ hasMouseDown: true });
          }}
          onMouseUp={() => this.setState({ hasMouseDown: false })}
          onMouseLeave={() => {
            if (this.state.hasMouseDown) {
              this.setState({ hasMouseDown: false });
            }
          }}
        >
          {this.props.allWall.map((wallRow, y) => {
            boxDate.add(1, "days");
            let weekDate = moment(boxDate);
            weekDate.subtract(1, "weeks");
            return (
              <div key={`${y}-rowHeader`} className="columncontainer">
                {wallRow.map((value, x) => {
                  weekDate.add(1, "weeks");
                  return (
                    <WallBox
                      key={`${x}-${y}-col`}
                      date={weekDate.format("MMM D, YYYY")}
                      x={x}
                      y={y}
                      value={value}
                      drawValue={this.props.drawValue}
                      updateDrawWall={this.props.updateDrawWall}
                      hasMouseDown={this.state.hasMouseDown}
                    />
                  );
                })}
              </div>
            );
          })}
          <span className="options">
            <button id="reset" className="danger" onClick={this.reset}>
              RESET
            </button>
            <button id="export" className="ok" onClick={this.export}>
              EXPORT
            </button>
            <label htmlFor="valueInput">Max commits in one day:</label>
            <input
              type="number"
              name="quantity"
              min="1"
              max="50"
              id="valueInput"
              value={this.state.value}
              onChange={this.updateInputValue}
            />
          </span>
          {this.state.export && (
            <pre>
              <button id="save" className="good" onClick={this.saveScript}>
                Save script
              </button>
              <code>{this.state.export}</code>
            </pre>
          )}
        </div>
      </Box>
    );
  }
}
