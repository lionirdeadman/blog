#!/bin/bash

TARGET=/tmp/resynth-build-$RANDOM

npm i
make build_production
mv _site $TARGET
git checkout master
mv $TARGET/* ./

