import moment from 'moment';
import { getStartDate } from '../../utils/convert-to-bash';

class WallObject {
  constructor(date) {
    this.date = date;
    this.value = 0;
  }

  setValue(newValue) {
    this.value = newValue;
  }

  getClassName() {
    const today = moment();
    if (this.date > today) {
      return 'wall';
    }
    let className = 'wall';
    switch (this.value) {
      case 1:
        className += ' wall-lighter-green';
        break;
      case 2:
        className += ' wall-light-green';
        break;
      case 3:
        className += ' wall-dark-green';
        break;
      case 4:
        className += ' wall-darker-green';
        break;
      default:
        className += ' wall-grey';
        break;
    }
    return className;
  }
}

class GitContributionWall {
  constructor() {
    this.walls = this.createWalls();

    this.state = {
      tempState: []
    };
    this.addArray = this.addArray.bind(this);
    this.unsetAllWall = this.unsetAllWall.bind(this);
  }

  unsetAllWall() {
    for (
      let outerArrayIndex = 0;
      outerArrayIndex < this.walls.length;
      outerArrayIndex++
    ) {
      for (
        let innerArrayIndex = 0;
        innerArrayIndex < this.walls[outerArrayIndex].length;
        innerArrayIndex++
      ) {
        this.walls[outerArrayIndex][innerArrayIndex].setValue(0);
        console.log(this.walls[outerArrayIndex][innerArrayIndex].value);
      }
    }
    //return this;
  }

  addArray(array2d) {
    for (
      let outerArrayIndex = 0;
      outerArrayIndex < this.walls.length;
      outerArrayIndex++
    ) {
      for (
        let innerArrayIndex = 0;
        innerArrayIndex < this.walls[outerArrayIndex].length;
        innerArrayIndex++
      ) {
        //console.log(this.walls[outerArrayIndex][innerArrayIndex].value);
        try {
          this.walls[outerArrayIndex][innerArrayIndex].setValue(
            array2d[outerArrayIndex][innerArrayIndex]
          );
        } catch (err) {
          this.walls[outerArrayIndex][innerArrayIndex].setValue(0);
        }
      }
    }
    return this;
  }

  createWalls() {
    const wall = [];
    // Generates the day of the week
    for (let day = 0; day < 7; day++) {
      let doneDayForWholeYear = false;
      const now = moment().add(day, 'days');
      let oneYearAgo = moment(getStartDate());
      oneYearAgo = oneYearAgo.add(day, 'days');
      const dayArrayForWholeYear = [];

      // Generates the number of day (i.e. Monday,Tuesday,...) for the rest of the year on the contribution wall
      while (!doneDayForWholeYear) {
        dayArrayForWholeYear.push(new WallObject(moment(oneYearAgo)));
        oneYearAgo.add('7', 'days');

        doneDayForWholeYear = oneYearAgo > now;
      }
      wall.push(dayArrayForWholeYear);
    }
    let dayString = '';
    for (let x = 0; x < wall.length; x++) {
      for (let y = 0; y < wall[x].length; y++) {
        dayString += '[ ]';
      }
      dayString += '\n\r';
    }
    console.log(dayString);
    return wall;
  }
}

export default GitContributionWall;
