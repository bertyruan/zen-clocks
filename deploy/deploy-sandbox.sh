#!/bin/bash

cd ~/berty/sandboxes
git pull
rm -vf ~/htdocs/*
cp -vf ~/berty/sandboxes/dist/sandboxes ~/htdocs
