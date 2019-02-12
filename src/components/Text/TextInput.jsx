import React, { PureComponent } from "react";
import { checkCharExists, getTextArray } from "../../utils/fontInterface";
import "./TextInput.css";
import Box from "../Box/Box";

export default class TextInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(event) {
    const {
      target: { value }
    } = event;

    let checkedValue = ""; //This section removes any characters which are not in the font
    for (let index in value) {
      if (checkCharExists(value[index])) {
        checkedValue += value[index];
      }
    }
    this.setState({
      text: checkedValue
    });
    this.setGitWall(checkedValue);
  }

  setGitWall(text) {
    let textWall = getTextArray(text);
    this.props.updateWall(textWall);
  }

  render() {
    return (
      <Box title="Enter text">
        <input
          className="text"
          type="text"
          value={this.state.text}
          onChange={this.updateInputValue}
        />
      </Box>
    );
  }
}
