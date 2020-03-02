var five = require("johnny-five");
var Raspi = require("raspi-io").RaspiIO;
var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  //need to add callback for when return byte recieved from ZUmo 32U4
  this.repl.inject({
    sendCommand: sendCommand,
  });
});



function processMsg(data1, data2) {
  // returns byte array from two inputs
  var byte = new Array(2);
  byte[0] = data1;
  byte[1] = data2;
  return byte;
}

function sendCommand(command, data) {
  // prepares message from command and data, then writes to specified i2c device
  var msg;
  //command list
  //code    command        data
  //01      moveForward    dist
  //02      moveBackwards  dist
  //03      turnRight      0<deg<180
  //04      turnLeft       0<deg<180
  //05      queryGyro      none
  switch (command) {
    case 'moveForward':
      msg = processMsg(0x01,data);
      break;
    case 'moveBackward':
      msg = processMsg(0x02,data);
      break;
    case 'turnLeft':
      msg = processMsg(0x03,data);
      break;
    case 'turnRight':
      msg = processMsg(0x04,data);
      break;
    default:
      throw 'Error: Not a valid command';
  }

  board.io.i2cWrite(0x2A, msg);

}