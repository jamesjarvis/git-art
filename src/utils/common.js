/**
 * Retrieves the colour class name from the draw value
 * @param {int} value 
 */
export function classNameFromVal(value) {
  let className = "wall";
  switch (value) {
    case 1:
      className += " wall-lighter-green";
      break;
    case 2:
      className += " wall-light-green";
      break;
    case 3:
      className += " wall-dark-green";
      break;
    case 4:
      className += " wall-darker-green";
      break;
    default:
      className += " wall-grey";
      break;
  }
  return className;
}