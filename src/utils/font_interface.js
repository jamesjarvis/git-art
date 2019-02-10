const { sinclair } = require("../assets/font.json");
/* 
The Sinclair Spectrum font, originally retrieved from:
https://github.com/pikesley/nineteen-eighty-two/blob/6057f8e478a560b9fd1005530354a87401b30ebe/config/characters.yml
and then converted to 7X7 2D array format for our purposes.
*/

export function checkCharExists(character) {
  return sinclair.hasOwnProperty(character);
}

export function getCharacterArray(character) {
  return checkCharExists(character) ? sinclair[character] : false;
}
