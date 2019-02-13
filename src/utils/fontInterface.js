const { sinclair } = require("../assets/font.json");
/* 
The Sinclair Spectrum font, originally retrieved from:
https://github.com/pikesley/nineteen-eighty-two/blob/6057f8e478a560b9fd1005530354a87401b30ebe/config/characters.yml
and then converted to 7X7 2D array format for our purposes.
*/

/**
 * Returns a boolean indicating whether the character is in the font
 * @param {String} character 
 */
export function checkCharExists(character) {
  return sinclair.hasOwnProperty(character);
}

/**
 * Returns the 2D array representation of the character if it exists in the font, or false otherwise
 * @param {String} character 
 */
export function getCharacterArray(character) {
  return checkCharExists(character) ? sinclair[character] : false;
}

/**
 * Returns the 2D array representation of the string passed in, encoded as the drawValue
 * @param {String} text 
 * @param {Number} drawValue
 */
export function getTextArray(text, drawValue) {
  var stringArray = [];
  for (var index = 0; index < text.length; index++) {
    var currentSinclairFont = getCharacterArray(text[index]);
    if (currentSinclairFont) {
      for (
        var outerArrayIndex = 0;
        outerArrayIndex < currentSinclairFont.length;
        outerArrayIndex++
      ) {
        stringArray.push([]);
        for (
          var innerArrayIndex = 0;
          innerArrayIndex < currentSinclairFont[outerArrayIndex].length;
          innerArrayIndex++
        ) {
          stringArray[outerArrayIndex].push(
            currentSinclairFont[outerArrayIndex][innerArrayIndex] * drawValue
          );
        }
      }
    }
  }

  return stringArray;
}
