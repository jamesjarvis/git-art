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
      var characterArray = [];
      const fontThing = new Object(FONT.sinclair[text[index]]);
      Object.assign(characterArray,fontThing);
      // console.log(text,index, FONT[text[index]]);
      if (characterArray.length > 0) {
      // console.log(text[character], characterArray[0].length)
      // console.log(characterArray);
      // console.log(text[character], characterArray[0].length)
      }
      if (stringArray.length === 0) {
        //stringArray = [];
        Object.assign(stringArray,characterArray);
      } else {
        // console.log("IM IN THE ELSE!");
        for (const i in characterArray) {
          // console.log(i);
          let clonedCharacterArrayI = [];
          Object.assign(clonedCharacterArrayI,characterArray[i]);
          for(const a in clonedCharacterArrayI) {
            stringArray[i].push(clonedCharacterArrayI[a]);
          }
          // stringArray[i] = stringArray[i].concat(characterArray[i]);
          // console.log(stringArray[i]);
        }
      }
      // console.log("AFtER");
      // console.log(stringArray);
      characterArray = [];
    }
    // console.log(stringArray);
    
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
