#!/usr/bin/env bash

output_dir="doc/jsdox"

if [ ! -e "doc" ]
then
  mkdir doc
  mkdir $output_dir
fi

./node_modules/.bin/jsdox --output $output_dir ./lib/*.js
