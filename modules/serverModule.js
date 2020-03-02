const express = require('express');


class serverModule {
    constructor(port) {
        this.app = express();
        this.port = port;
    }
    init() {
        console.log(__dirname);
        this.app.get('/', (req, res) => {
            res.sendFile('home.html', {
                root: `./roombot-pi/public/`
            });
        });
        this.app.use((req, res) => {
            res.sendFile(req.path, {
                root: `./roombot-pi/public/`
            });
        });
        this.app.listen(this.port);
    }
}

function create(port) {
    return new serverModule(port);
}

module.exports = create