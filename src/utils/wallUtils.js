import moment from "moment";
import { getStartDate } from "./convert-to-bash";

/**
 * Generates a blank year long wall template
 */
export function blankWall() {
  const val = 0;
  let wall = [[], [], [], [], [], [], []];
  let start = moment(getStartDate());
  let today = moment();
  const dayDiff = today.diff(start, "days");
  //fill in the 2D array
  let weekDay = 0;
  for (let i = 0; i <= dayDiff; i++) {
    wall[weekDay].push(val);
    weekDay = weekDay === 6 ? 0 : weekDay + 1; //updated the week day
  }
  return wall;
}

/**
 * Updates the cell at the specified position in the wall with the specified value
 * @param {int} x 
 * @param {int} y 
 * @param {int} drawValue 
 * @param {Array<Array<int>>} wall 
 */
export function updateWall(x, y, drawValue, wall) {
  if (wall[y] === undefined) {
    return wall;
  }
  if (wall[y][x] === undefined) {
    return wall;
  }
  wall[y][x] = drawValue;
  return wall;
}

/**
 * Mixes the values of the two walls, so the strongest values are over the top
 * @param {Array<Array<int>>} baseWall 
 * @param {Array<Array<int>>} topWall 
 */
export function overlayWall(baseWall, topWall) {
  const yLength = Math.min(baseWall.length, topWall.length);
  for (let y = 0; y < yLength; y++) {
    const xLength = Math.min(baseWall[y].length, topWall[y].length);
    for (let x = 0; x < xLength; x++) {
      baseWall[y][x] = Math.max(baseWall[y][x], topWall[y][x]);
    }
  }
  return baseWall;
}

/**
 * Mixes the values of multiple walls into the main wall
 * @param {Array<Array<int>>} baseWall 
 * @param {Array<Array<int>>} topWalls 
 */
export function mixWalls(baseWall, topWalls) {
  for(let wall in topWalls){
    baseWall = overlayWall(baseWall, topWalls[wall]);
  }
  return baseWall;
}
