import React from "react";
import WallBox from "./WallBox";
import moment from "moment";
import "./Wall.css";
import { generateBash } from "../../utils/convertToBash";
import Box from "../Box/Box";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMouseDown: false,
      export: ""
    };
    this.export = this.export.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      export: ""
    });
    this.props.reset();
  }

  export() {
    this.setState({
      export: generateBash(this.props.allWall, 8)
    });
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
          <button onClick={this.reset}>Click me to reset</button>
          <button onClick={this.export}>Click me to export</button>
          <pre>
            <code>{this.state.export}</code>
          </pre>
        </div>
      </Box>
    );
  }
}
