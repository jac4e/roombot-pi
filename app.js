const serverModule = require('./modules/serverModule');
// const boardModule = require('./modules/boardModule');
const visionModule = require('./modules/visionModule');

const server = serverModule();
// const rpi = boardModule();
server.init();
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

const test = visionModule();
const fps = 30;
server.initStream(4);
setInterval(() => {
    server.stream(test.mapView().concat(test.camView()));
}, 1000 / fps);