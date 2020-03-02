export const http = require('http');
export const url = require('url');
export const querystring = require('querystring');
export const fs = require('fs');

export class serverModule {
    constructor(port) {
        this.port = port
        this.server = {}
    }
    initServer() {
        this.server = http.createServer(this.handler(req, res));
        this.server.listen(this.port);
    }
    handler(req, res) {
        let path = url.parse(req.url).pathname;
        console.log(path)
        if (path == '/') {
            path = '/home.html'
        }
        console.log(path)
        let ext = path.match(/\.[A-Za-z0-9]+$/gi);
        if (ext == null) {
            ext = ['.html'];
        }
        ext = ext.pop().replace('.', '');
        let filename = path.match(/^(\/[0-9A-Za-z-_~]*)*(\.[0-9A-Za-z-_~]+)+/gi, '').pop().replace(`.${ext}`, '').replace(/^\//gi, '');
        path = `${filename}.${ext}`

        let params = querystring.parse(url.parse(req.url).query); // will be used later

        fs.access(path, fs.constants.F_OK, function (err) {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': `text/html`
                });
                res.write(`<h1>404</h1><h2>${path} does not exist</h2>`);
            } else {
                processFile(path, ext, res);
            }
            res.end();
        });
    }
    processFile() {
        if (ext == 'html') {
            res.writeHead(200, {
                'Content-Type': `text/html`
            });
            res.write(fs.readFileSync('header.html'));
            res.write(fs.readFileSync(path));
            res.write(fs.readFileSync('footer.html'));
        } else {
            res.writeHead(200, {
                'Content-Type': `text/${ext}`
            });
            res.write(fs.readFileSync(path));
        }
    }
}

// function genHeader(){
//     let header;
//     fs.readDir('/html/', function(

//     )
// }