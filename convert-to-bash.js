TEMPLATE_ARRAY = [
    [0,0.25,0.25,0.75,1,0.75,0.25,0.25,0],
    [0,0.25,0.25,0.75,1,0.75,0.25,0.25,0],
    [0,0.25,0.25,0.75,1,0.75,0.25,0.25,0],
    [0,0.25,0.25,0.75,1,0.75,0.25,0.25,0],
    [0,0.25,0.25,0.75,1,0.75,0.25,0.25,0],
    [0,0.25,0.25,0.75,1,0.75,0.25,0.25,0],
    [0,0.25,0.25,0.75,1,0.75,0.25,0.25,0]
];//This should be a gradiented box.

README_TEMPLATE = 
`#My Github Art
Created using [git-art](https://github.com/jamesjarvis/git-art)`

/*
Get the start date - so the first sunday 1 year ago.
*/
function getStartDate() {
    startDate = new Date();
    startDate.setYear(startDate.getFullYear() - 1);
    startDate.setUTCHours(12);
    startDate.setUTCMinutes(0);
    startDate.setUTCSeconds(0);
    weekDay = startDate.getDay();

    while(weekDay < 6) {
        startDate.setDate(startDate.getDate() + 1);
        weekDay = startDate.getDay();
    }

    return startDate;
}

/* 
This function should convert the supplied 2d array from the parameter into a bash script which can be run by the user.
The bash script should take the 2d array, create a git repo with the required commits and then upload it to the repo specified.
*/
function generateBash(image_array) {
    startDate = getStartDate();
}


console.log(getStartDate());