import React from "react";
import Box from "../Box/Box";
import { classNameFromVal } from "../../utils/common";
import "./SelectColour.css";

export default function SelectColour({ setDrawValue, drawValue }) {
  const colours = [0, 1, 2, 3, 4];
  return (
    <Box title="Choose a colour">
      <div className="draw">
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
    </Box>
  );
}
