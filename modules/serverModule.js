const express = require('express');
const http = require('http');
const app = express();
const server = app.listen(3030);
const io = require('socket.io')(server);

class serverModule {
    constructor(port) {
        this.httpServer = http.createServer(app);
        this.port = port;
    }
    init() {
        app.get('/', (req, res) => {
            res.sendFile('home.html', {
                root: `./roombot-pi/public/`
            });
        });
        app.use((req, res) => {
            res.sendFile(req.path, {
                root: `./roombot-pi/public/`
            });
        });
        this.httpServer.listen(this.port);
    }
    createSocket(listner, func){
        // socket stuff
        io.on('connection', (socket) => {
            socket.on(listner, func);
        });
    }
    initStream(num){
        io.on('connection', (socket) => {
            socket.emit('incomingStreams', { amt: num});
        });
    }
    stream(imgArray) {
        for (let i = 0; i < imgArray.length; i++){
            io.emit(`stream${i}`, { frame: imgArray[i] });
        }
    }
}

// Add possible map view with location robot belives it is at.

function create(port) {
    return new serverModule(port);
}

module.exports = create