const serverModule = require('./modules/serverModule');
const boardModule = require('./modules/boardModule');
const visionModule = require('./modules/visionModule');

const server = serverModule();
const rpi = boardModule();
server.init();
server.createSocket('moveForward', () => {
    rpi.sendCommand('moveForward');
    console.log('moveForward');
});
server.createSocket('moveBackward', () => {
    rpi.sendCommand('moveBackward');
    console.log('moveBackward');
});
server.createSocket('turnLeft', () => {
    rpi.sendCommand('turnLeft');
    console.log('turnLeft');
});
server.createSocket('turnRight', () => {
    rpi.sendCommand('turnRight');
    console.log('turnRight');
});
server.createSocket('stop', () => {
    rpi.sendCommand('stop');
    console.log('stop');
});