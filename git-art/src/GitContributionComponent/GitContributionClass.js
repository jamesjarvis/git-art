import moment from 'moment';

class GitContributionWall{
    constructor(){
        this.wall=this.createWall();
    }
    createWall(){
        let wall = [];
        for(let day = 0; day < 7 ;day++){
            let doneDayForWholeYear = false;
            let now = moment().add(day,'days');
            let oneYearAgo = moment().subtract(1,'years');
            oneYearAgo = oneYearAgo.add(day,'days');
            let dayArrayForWholeYear = [];
            //Generates the number of day (i.e. Monday,Tuesday,...) for the rest of the year on the contribution wall
            while(!doneDayForWholeYear){
                dayString +='[ ]';
                dayArrayForWholeYear.push(new WallObject(moment(oneYearAgo)));
                oneYearAgo.add('7','days');
                doneDayForWholeYear = oneYearAgo>now;
            }
            wall.push(dayArrayForWholeYear);
        }
        let dayString = ""
        for(let x = 0; x < wall.length; x++){
            
            for(let y = 0; y < wall[x].length; y++){
                dayString += "[ ]";
            }
            dayString+="\n\r"
        }
        console.log(dayString);
        return wall;
    }


}

class WallObject{
    constructor(date){
        this.date = date;
    }
}

export default GitContributionWall;