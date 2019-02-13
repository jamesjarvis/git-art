import React from "react";
import "./WallBox.css";
import { classNameFromVal } from "../../utils/common";

export default function WallBox({value, date, hasMouseDown, x, y, drawValue, updateDrawWall}) {
  return (
    <div
      className={classNameFromVal(value)}
      tooltip={`Contributions on ${date}`}
      onMouseMove={e => {
        if (hasMouseDown) {
          updateDrawWall(
            x,
            y,
            drawValue
          );
        }
      }}
      onMouseEnter={e => {
        if (hasMouseDown) {
          updateDrawWall(
            x,
            y,
            drawValue
          );
        }
      }}
      onMouseUp={e => {
        if (hasMouseDown) {
          updateDrawWall(
            x,
            y,
            drawValue
          );
        }
      }}
    />
  );
}
