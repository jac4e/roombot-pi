const serverModule = require('./modules/serverModule');
const visionModule = require('./modules/visionModule');
const os = require('os');
let arm64;
// Enable/disable boardModule based on architecture
if (os.arch() == 'arm64') {
    const boardModule = require('./modules/boardModule');
    const rpi = boardModule();
    arm64 = true;
} else {
    arm64 = false;
    console.log('test');
}

// Initialize webserver
const server = serverModule();
server.init();

// Vision system
const vision = visionModule();
const fps = 5;
server.initStream(1);
setInterval((err) => {
    server.stream(vision.matchFeature(vision.cameraRead()));
}, 1000 / fps);

// Raspberry pi specific code:
//   sensor update
//   webapp control initializeation
if (arm64) {
    let accelData = [0, 0, 0];
    let gyroData = [0, 0, 0];

    function updateAccel() {
        rpi.readAccel('X', (x) => {
            accelData[0] = x
        });
        rpi.readAccel('Y', (y) => {
            accelData[1] = y
        });
        rpi.readAccel('Z', (z) => {
            accelData[2] = z
        });
        // Will need to convert to G's after calibration
        console.log(`Accel: ${accelData}`)
    }

    function updateGyro() {
        rpi.readGyro('X', (x) => {
            gyroData[0] = x
        });
        rpi.readGyro('Y', (y) => {
            gyroData[1] = y
        });
        rpi.readGyro('Z', (z) => {
            gyroData[2] = z
        });
        console.log(`gyro: ${gyroData}`)
    }
    setInterval(updateAccel, 100);
    setInterval(updateGyro, 100);
    server.createSocket('moveForward', () => {
        // rpi.moveCmd('moveForward');
        console.log('moveForward');
    });
    server.createSocket('moveBackward', () => {
        // rpi.moveCmd('moveBackward');
        console.log('moveBackward');
    });
    server.createSocket('turnLeft', () => {
        // rpi.moveCmd('turnLeft');
        console.log('turnLeft');
    });
    server.createSocket('turnRight', () => {
        // rpi.moveCmd('turnRight');
        console.log('turnRight');
    });
    server.createSocket('stop', () => {
        // rpi.moveCmd('stop');
        console.log('stop');
    });
}
