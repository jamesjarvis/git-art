import React, { Component } from "react";

export default class TextInput extends Component {
  render() {
    return (
      <section className="section">
        <div className="box has-text-centered">
          <input className="input" type="text" placeholder="Hi" />
        </div>
      </section>
    );
  }
}
