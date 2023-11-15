#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m "first commit"
git push -f git@github.com:Babic4/army.git master:gh-pages

cd -