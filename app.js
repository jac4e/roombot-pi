let http = require('http');
let url = require('url');
let querystring = require('querystring');
let fs = require('fs');

// let onoff = require('onoff'); for control of raspberry pi gpio pins
// let i2c = require('i2c-bus'); i2c-bus access for communication with arduino
// let opencv = require('npm-opencv');

function processFile(path, ext, res) {
    if (ext=='html'){
        res.writeHead(200, {'Content-Type': `text/html`});
        res.write(fs.readFileSync('header.html'));
        res.write(fs.readFileSync(path));
        res.write(fs.readFileSync('footer.html'));
    } else {
        res.writeHead(200, {'Content-Type': `text/${ext}`});
        res.write(fs.readFileSync(path));
    }
}

// function genHeader(){
//     let header;
//     fs.readDir('/html/', function(
        
//     )
// }

let server = http.createServer(function(req,res) {
    let path = url.parse(req.url).pathname;
    console.log(path)
    if (path=='/'){path='/home.html'}
    console.log(path)
    let ext = path.match(/\.[A-Za-z0-9]+$/gi);
    if (ext==null){ext = ['.html'];}
    ext = ext.pop().replace('.','');
    let filename = path.match(/^(\/[0-9A-Za-z-_~]*)*(\.[0-9A-Za-z-_~]+)+/gi,'').pop().replace(`.${ext}`,'').replace(/^\//gi,'');
    path = `${filename}.${ext}`
    let params = querystring.parse(url.parse(req.url).query);
    fs.access(path, fs.constants.F_OK,function(err) {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': `text/html`});
            res.write(fs.readFileSync('header.html'));
            res.write(`<h1>404</h1><h2>${path} does not exist</h2>`);
            res.write(fs.readFileSync('footer.html'));
        } else {
            processFile(path, ext, res);
        }
        res.end();
    });
});

server.listen(8080);
