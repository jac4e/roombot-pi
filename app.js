const serverModule = require('./modules/serverModule');
//const boardModule = require('./modules/boardModule');
const visionModule = require('./modules/visionModule');

const server = serverModule(8080);
//const rpi = boardModule();
server.init();
server.createSocket('moveForward', () => {
    //  rpi.sendCommand('moveForward',10);
    console.log('moveForward');
});
server.createSocket('moveBackward', () => {
    //  rpi.sendCommand('moveForward',10);
    console.log('moveBackward');
});
server.createSocket('turnLeft', () => {
    //  rpi.sendCommand('moveForward',10);
    console.log('turnLeft');
});
server.createSocket('turnRight', () => {
    //  rpi.sendCommand('moveForward',10);
    console.log('turnRight');
});