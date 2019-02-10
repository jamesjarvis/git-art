import React, { PureComponent } from "react";
import { getCharacterArray, checkCharExists } from "../../utils/font_interface";

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

  generate_text_array(text) {
    let stringArray = [];
    for (let index = 0; index < text.length; index++) {
      let currentSinclairFont = getCharacterArray(text[index]);
      if (currentSinclairFont) {
        for (
          var outerArrayIndex = 0;
          outerArrayIndex < currentSinclairFont.length;
          outerArrayIndex++
        ) {
          stringArray.push([]);
          for (
            var innerArrayIndex = 0;
            innerArrayIndex < currentSinclairFont[outerArrayIndex].length;
            innerArrayIndex++
          ) {
            stringArray[outerArrayIndex].push(
              currentSinclairFont[outerArrayIndex][innerArrayIndex]
            );
          }
        }
      }
    }

    return stringArray;
  }

  setGitWall(text) {
    let textWall = this.generate_text_array(text);
    this.props.updateWall(textWall);
  }

  render() {
    return (
      <section className="section">
        <div className="box has-text-centered">
          <input
            className="input"
            type="text"
            value={this.state.text}
            onChange={this.updateInputValue}
          />
        </div>
      </section>
    );
  }
}
