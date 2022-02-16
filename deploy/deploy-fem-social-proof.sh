#!/bin/bash

cd ~/berty/fem-social-proof
git pull
rm -vf ~/htdocs/portfolio/fem-social-proof/*
cp -vf index.html main.css default.css ~/htdocs/portfolio/fem-social-proof

# cp -vfr * ~/htdocs/portfolio/fem-social-proof
# rm -vfr ~/htdocs/portfolio/fem-social-proof/*