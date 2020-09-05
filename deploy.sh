#!/usr/bin/env sh

# abort on errors
set -e

# install
yarn install

# build
yarn build

# navigate into the build output directory
cd dist