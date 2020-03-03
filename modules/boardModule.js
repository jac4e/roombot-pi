const five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;

class boardModule {
    constructor() {
        this.board = new five.Board({
            io: new Raspi()
        });
        this.board.on('ready', () => {
            console.log('Board is Ready\n');
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

    // Test interfacing with gyroscope and acceleromator
    // Accel slave address is 0x1d
    // script below is from lsm303 pololu
    //     void LSM303::readAcc(void)
    // {
    //   Wire.beginTransmission(acc_address);
    //   // assert the MSB of the address to get the accelerometer
    //   // to do slave-transmit subaddress updating.
    //   Wire.write(OUT_X_L_A | (1 << 7));
    //   last_status = Wire.endTransmission();
    //   Wire.requestFrom(acc_address, (byte)6);

    //   unsigned int millis_start = millis();
    //   while (Wire.available() < 6) {
    //     if (io_timeout > 0 && ((unsigned int)millis() - millis_start) > io_timeout)
    //     {
    //       did_timeout = true;
    //       return;
    //     }
    //   }

    //   byte xla = Wire.read();
    //   byte xha = Wire.read();
    //   byte yla = Wire.read();
    //   byte yha = Wire.read();
    //   byte zla = Wire.read();
    //   byte zha = Wire.read();

    //   // combine high and low bytes
    //   // This no longer drops the lowest 4 bits of the readings from the DLH/DLM/DLHC, which are always 0
    //   // (12-bit resolution, left-aligned). The D has 16-bit resolution
    //   a.x = (int16_t)(xha << 8 | xla);
    //   a.y = (int16_t)(yha << 8 | yla);
    //   a.z = (int16_t)(zha << 8 | zla);
    // }

}
// Possible make class or subclass for communication, motor controls, and sensors

function create() {
    return new boardModule();
}

module.exports = create