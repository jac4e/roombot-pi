const serverModule = require('./modules/serverModule');
const boardModule = require('./modules/boardModule');
const visionModule = require('./modules/visionModule');

const server = serverModule(8080);
const rpi = boardModule();
rpi.sendCommand('moveForward',10);
server.init();
