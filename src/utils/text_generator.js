const FONT = require("../assets/font.json");
/* 
The Sinclair Spectrum font, originally retrieved from:
https://github.com/pikesley/nineteen-eighty-two/blob/6057f8e478a560b9fd1005530354a87401b30ebe/config/characters.yml
and then converted to 7X7 2D array format for our purposes.
*/

// This function is an absolute mess
// For some reason, it will modify the font itself with the previous value of the entire text.????????????????
export function generate_text_array(text) {
  let stringArray = new Array();
  for (const character in text) {
    var characterArray = new Object(FONT.sinclair[text[character]]);
    if (characterArray.length > 0) {
    console.log(text[character], characterArray[0].length)
    console.log(characterArray);
    }
    if (stringArray.length === 0) {
      stringArray = new Object(characterArray);
    } else {
      for (const i in characterArray) {
        for(const a in characterArray[i]) {
          stringArray[i].push(characterArray[i][a]);
        }
      }
    }
  }
  
  return stringArray;
}
