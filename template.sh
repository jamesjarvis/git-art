#!/usr/bin/env bash
REPO=testing
git init $REPO
cd $REPO
touch README.md
echo "testing" >> README.md
git add README.md
touch git-art
git add git-art

GIT_AUTHOR_DATE={0} GIT_COMMITTER_DATE={1}
git commit --allow-empty -m "git-art" > /dev/null

# git remote add origin {2}:{3}/$REPO.git
# git pull origin master
# git push -u origin master