const five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const board = new five.Board({
    io: new Raspi()
});

class boardModule {
    constructor() {
        this.board = new five.Board({
            io: new Raspi()
        });
        this.board.on('ready', this.ready);
    }
    ready() {
        this.board.repl.inject({
            sendCommand: this.sendCommand,
        });
    }
    processMsg(data1, data2) {
        // returns byte array from two inputs
        let byte = new Array(2);
        byte[0] = data1;
        byte[1] = data2;
        return byte;
    }
    sendCommand(command, data) {
        // prepares message from command and data, then writes to specified i2c device
        let msg;
        //command list
        //code    command        data
        //01      moveForward    dist
        //02      moveBackwards  dist
        //03      turnRight      0<deg<180
        //04      turnLeft       0<deg<180
        //05      queryGyro      none
        switch (command) {
            case 'moveForward':
                msg = processMsg(0x01, data);
                break;
            case 'moveBackward':
                msg = processMsg(0x02, data);
                break;
            case 'turnLeft':
                msg = processMsg(0x03, data);
                break;
            case 'turnRight':
                msg = processMsg(0x04, data);
                break;
            default:
                throw 'Error: Not a valid command';
        }

        this.board.io.i2cWrite(0x2A, msg);

    }
}

function create() {
    return new boardModule();
}

module.exports = create