const five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
// Define slave and registry addresses for acceleration sensor
const LS303D = {
    ADDR: 0x1D,
    CTRL1: 0x20,
    XL: 0x28,
    XH: 0x29,
    YL: 0x2A,
    YH: 0x2B
}
// Define slave and registry addresses for gyroscope sensor
const L3GD20H = {
    ADDR: 0x6B,
    CTRL1: 0x20,
    XL: 0x28,
    XH: 0x29,
    YL: 0x2A,
    YH: 0x2B
}

class boardModule {
    constructor() {
        this.board = new five.Board({
            io: new Raspi()
        });
        this.board.on('ready', () => {
            initSensors()
            console.log('Board is Ready\n');
            this.board.repl.inject({
                // calibrate: this.calibrate
            });
        });
    }
    processMsg(data1, data2) {
        // returns byte array from two inputs
        let byte = new Array(2);
        byte[0] = data1;
        byte[1] = data2;
        return byte;
    }
    moveCmd(command, data) {
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
            // add setSpeed case?
            case 'moveForward':
                msg = this.processMsg(0x01, data);
                break;
            case 'moveBackward':
                msg = this.processMsg(0x02, data);
                break;
            case 'turnLeft':
                msg = this.processMsg(0x03, data);
                break;
            case 'turnRight':
                msg = this.processMsg(0x04, data);
                break;
            case 'stop':
                msg = this.processMsg(0x05, data);
                break;
            default:
                throw 'Error: Not a valid command';
        }

        this.board.io.i2cWrite(0x2A, msg);
    }
    initSensors() {
        this.board.io.i2cWrite(LS303D.ADDR, LS303D.CTRL1, 0x57); // write 0110 0111 to LS303D CTRL1 registry
        this.board.io.i2cWrite(L3GD20H.ADDR, L3GD20H.CTRL1, 0x0f); // write 0000 1111 to L3GD20H CTRL1 registry
    }
    readAccel(coord,handler) {
        board.io.i2cReadOnce(LS303D.ADDR, LS303D.XL, 1, (L) => {
            board.io.i2cReadOnce(LS303D.ADDR, LS303D.XH, 1, (H)=> {
                const uA = (H[0] << 8) | (L[0]); //create 16bit twos-complement
                A = new Int16Array([uAX]); //convert to singed Int16
                handler(A[0]);
            });
        });
    }
    readGyro(coord,handler) {
        board.io.i2cReadOnce(L3GD20H.ADDR, L3GD20H.XL, 1, (L) => {
            board.io.i2cReadOnce(L3GD20H.ADDR, L3GD20H.XH, 1, (H)=> {
                const uA = (H[0] << 8) | (L[0]); //create 16bit twos-complement
                A = new Int16Array([uAX]); //convert to singed Int16
                handler(A[0]);
            });
        });
    }
}
// Possible make class or subclass for communication, motor controls, and sensors

function create() {
    return new boardModule();
}

module.exports = create