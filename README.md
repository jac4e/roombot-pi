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

## Todo

- Finish boardModule updateAccel fucntion
  - Must be able to read all 3 accel values from sensor and update global varible for acceleration them best course is to have an ax, ay , az function
- Finish boardModule updateGyro function
  - Must be able to read 3 gyro axes from sensor and return using same theory as readAccel
- Change IMU init options for 100HZ
- Create trackingModule position tracking system based off of <https://arxiv.org/pdf/1704.06053.pdf>
  - Adopt the ros sytem using rosnodejs
  - implement sytem using <https://github.com/HKUST-Aerial-Robotics/VINS-Mono>