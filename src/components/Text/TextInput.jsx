import React, { Component } from "react";
const FONT = require('../../assets/font.json');
// import { FONT } from "../../assets/font";

export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    }
    console.log(this.props.consumerProps)
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(event) {
    // console.log(event.target.value);
    
    this.setState({
      text: event.target.value,
    },()=>{this.setGitWall(this.state.text);});
  }

  generate_text_array(text) {
    let stringArray = new Array();
    for (let index = 0; index < text.length; index++) {

      let currentSinclairFont = FONT.sinclair[text[index]]
      for(var outerArrayIndex = 0; outerArrayIndex < currentSinclairFont.length; outerArrayIndex++){
        stringArray.push([]);
        for(var innerArrayIndex = 0; innerArrayIndex < currentSinclairFont[outerArrayIndex].length; innerArrayIndex++){
          stringArray[outerArrayIndex].push(currentSinclairFont[outerArrayIndex][innerArrayIndex]);
        }
      }

    }
    console.log(stringArray);
    
    return stringArray;
  }
  
  setGitWall(text) {
    // console.log(text);
    //console.log(generate_text_array(text));
    let newGitWallObj = this.props.consumerProps.gitWallObject.addArray(this.generate_text_array(text));
    this.props.consumerProps.updateGitWallObj(newGitWallObj);
  }

  render() {
    return (
      <section className="section">
        <div className="box has-text-centered">
          <input className="input" type="text" value={this.state.text} onChange={this.updateInputValue} />
        </div>
      </section>
    );
  }
}
