import moment from "moment";
import {getStartDate} from '../convert-to-bash';

class GitContributionWall {
  constructor() {
    this.walls = this.createWalls();
  }
  createWalls() {
    let wall = [];
    //Generates the day of the week
    for (let day = 0; day < 7; day++) {
      let doneDayForWholeYear = false;
      let now = moment().add(day,"days");
      let oneYearAgo = moment(getStartDate());
      oneYearAgo = oneYearAgo.add(day, "days");
      let dayArrayForWholeYear = [];

      //Generates the number of day (i.e. Monday,Tuesday,...) for the rest of the year on the contribution wall
      while (!doneDayForWholeYear) {
        dayArrayForWholeYear.push(new WallObject(moment(oneYearAgo)));
        oneYearAgo.add("7", "days");

        doneDayForWholeYear = oneYearAgo > now;
      }
      wall.push(dayArrayForWholeYear);
    }
    let dayString = "";
    for (let x = 0; x < wall.length; x++) {
      for (let y = 0; y < wall[x].length; y++) {
        dayString += "[ ]";
      }
      dayString += "\n\r";
    }
    console.log(dayString);
    return wall;
  }


}

class WallObject {
  constructor(date) {
    this.date = date;
    this.value = 0;
  }
  setValue(newValue){
    this.value = newValue;
  }
  getClassName(){
    let today = moment();
    if(this.date > today){
      return 'wall';
    }
    let className = "wall";
    switch (this.value){
      case 1:
        className+=" wall-lighter-green";
        break;
      case 2:
        className+=" wall-light-green";
        break;
      case 3:
        className+=" wall-dark-green";
        break;
      case 4:
        className+=" wall-darker-green";
        break;
      default:
        className+=" wall-grey";
        break;
    }
    return className;
  }
}

export default GitContributionWall;
