# roombot-pi

[![Build Status](https://travis-ci.com/jaclegonetwork/roombot-pi.svg?token=PAxxTqBayq9cFAHq5Byn&branch=master)](https://travis-ci.com/jaclegonetwork/roombot-pi)

## Goal

Using node.js and OpenCV, it must be able to detect and catalog rubber balls in its immediate vicinity while assigning coordinates to each one. After determining which rubber ball is the closest, it should send two coordinates to a Zumo32U4; it's the current position and the position of the closet rubber ball.

## Dependencies

opencv4nodejs
johnny-five
express
socket.io
raspi-io