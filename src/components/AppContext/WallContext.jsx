import React from "react";
import { blankWall } from '../../utils/wallUtils';

let textWall = [];
let drawWall = blankWall();
let imageWall = [];
let allWall = blankWall()

export const GitWallContext = React.createContext({
  textWall,
  drawWall,
  imageWall,
  allWall
});
