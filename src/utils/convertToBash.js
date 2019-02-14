const INSTRUCTIONS = `Upload your creation to GitHub!\n
1. Create a new empty repo on your GitHub account\n
2. Upload your repository using the instructions on https://github.com/new, or this script!`;
const README_TEMPLATE = `# My Github Art\n
Created using [git-art](https://github.com/jamesjarvis/git-art)`;

/**
 * Returns the start date - so the first sunday 1 year ago.
 */
export function getStartDate() {
  let startDate = new Date();
  startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
  startDate.setUTCHours(12);
  startDate.setUTCMinutes(0);
  startDate.setUTCSeconds(0);
  let weekDay = startDate.getUTCDay();

  while (weekDay !== 0) {
    startDate.setUTCDate(startDate.getUTCDate() - 1);
    weekDay = startDate.getUTCDay();
  }

  return startDate;
}

/**
 * Returns a string of commit information for that day, based on the number of commits requested.
 * @param {Date} date
 * @param {Number} commits
 */
function commit(date, commits) {
  let commitDate = new Date(date.valueOf());
  let dayCommitInstructions = [];
  for (let i = 0; i < commits; i++) {
    dayCommitInstructions.push(
      `GIT_AUTHOR_DATE=${commitDate.toISOString()} GIT_COMMITTER_DATE=${commitDate.toISOString()} git commit --allow-empty -a -m "git-art" > /dev/null`
    );
    commitDate.setUTCMinutes(commitDate.getUTCMinutes() + 1);
  }
  return dayCommitInstructions;
}

/**
 * This function should convert the supplied 2d array from the parameter into a bash script which can be run by the user.
 * @param {Array<Array<int>>} imageArray
 * @param {int} multiplier
 */
export function generateBash(imageArray, multiplier = 1) {
  let startDate = getStartDate();
  const length = Math.min(...imageArray.map(x => x.length));
  let commitInstructions = [];

  for (let week = 0; week < length; week++) {
    for (let day = 0; day < imageArray.length; day++) {
      const daysCommits = commit(startDate, imageArray[day][week] * multiplier);
      if (daysCommits.length > 0) {
        commitInstructions.push(daysCommits.join("\n"));
      }
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  let bashScript = `#!/usr/bin/env bash
  REPO=artistic
  UPLOAD_INSTRUCTIONS="${INSTRUCTIONS}"
  git init $REPO
  cd $REPO
  touch README.md
  echo "${README_TEMPLATE}" >> README.md
  git add README.md
  touch git-art
  git add git-art
  gitCommits() {
    ${commitInstructions.join("\n")}
  }
  spinner() {
    printf "$0: Committing your art...   "
    while true; do
      printf "\\b/"
      sleep 0.1
      printf "\\b-"
      sleep 0.1
      printf "\\b\\\\"
      sleep 0.1
      printf "\\b|"
      sleep 0.1
    done
  }
  spinner &
  SPIN=$!
  gitCommits
  kill $SPIN >/dev/null 2>&1
  echo "  ...completed git commits"
  echo "**************************"
  echo $UPLOAD_INSTRUCTIONS
  echo "**************************"
  read -r -p "Would you like to upload now? [Y/n] > " input
  case $input in
  [yY][eE][sS] | [yY])
    echo "Firstly, make sure you have created a new repository at: https://github.com/new"
    echo "Then..."
    read -r -p "Enter your GitHub username > " username
    read -r -p "Enter your repositary name > " repository
    git remote add origin https://github.com/$username/$repository.git
    git push -u origin master
    echo "Done! Check out your creation at https://github.com/$username"
    ;;
  [nN][oO] | [nN])
    echo "See ya later, alligator."
    ;;
  *)
    echo "Invalid input."
    exit 1
    ;;
  esac`;

  return bashScript;
}
