const express = require('express');
const http = require('http');
const app = express();
const server = app.listen(3030);
const io = require('socket.io')(server);

class serverModule {
    constructor(port) {
        this.httpServer = http.createServer(this.app);
        this.port = port;
    }
    init() {
        console.log(__dirname);
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
        })
    }
}

function create(port) {
    return new serverModule(port);
}

module.exports = create