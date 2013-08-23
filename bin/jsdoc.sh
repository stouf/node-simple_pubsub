#!/usr/bin/env bash

doc_dir="doc"
jsdoc_dir="jsdoc"
lib_dir="lib"

if [ ! -e $doc_dir ]
then
  mkdir $doc_dir
  mkdir $doc_dir/$jsdoc_dir
fi

for i in `ls $lib_dir/*.js`
do
  output_dir=$doc_dir/$jsdoc_dir/`echo $i | cut -d '/' -f 2 | cut -d '.' -f 1`
  ./node_modules/.bin/jsdoc -d $output_dir $i
done
