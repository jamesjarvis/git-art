import React from "react";
// import "../GitContribution/css/GitContribution.css";
import { classNameFromVal } from "../../utils/common";
import './SelectColour.css';

export default function SelectColour({setDrawValue, drawValue}) {
  const colours = [0, 1, 2, 3, 4];
  return (
    <section className="section">
      <div className="box">
        <div className="control has-text-centered">
          {colours.map(colour => (
            <label key={classNameFromVal(colour)} className="radio">
              <input
                type="radio"
                name="answer"
                onClick={() => setDrawValue(colour)}
                checked={drawValue === colour}
                readOnly
              />
              <div className={`${classNameFromVal(colour)} wall-special`} />
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
