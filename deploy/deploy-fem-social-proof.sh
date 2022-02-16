#!/bin/bash

cd ~/berty/fem-social-proof
git pull
rm -vf ~/htdocs/portfolio/fem-social-proof/*
cp -vf * ~/htdocs/portfolio/fem-social-proof