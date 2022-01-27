#!/bin/bash


cd ~/berty/bertyruan.github.io
git pull
rm -vf ~/htdocs/portfolio/fem-meetup/*
cp -vf * ~/htdocs/portfolio/fem-meetup
