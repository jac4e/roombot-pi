# roombot-pi

[![Build Status](https://travis-ci.com/jaclegonetwork/roombot-pi.svg?token=PAxxTqBayq9cFAHq5Byn&branch=master)](https://travis-ci.com/jaclegonetwork/roombot-pi)

Allows a raspberry pi to control a Zumo 32U4 arduino sumo robot using i2c. Also runs a webapp on the pi that implements remote control and a camera stream using websockets.

OpenCV can be used for computer vision applications.

### Communication

Raspberry pi is setup as a master with the Zumo32U4 the slave in a i2c Master Writer / Slave Receiver setup.

## Dependencies

opencv4nodejs
johnny-five
express
socket.io
raspi-io
