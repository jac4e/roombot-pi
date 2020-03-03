const cv = require('opencv4nodejs');

class visionModule {
    constructor() {
        this.camera = new cv.VideoCapture(0);
    }
    camView() {
        let img = this.camera.read();
        return this.process(img);
    }
    mapView() {
        let img = cv.imread(`${__dirname}/colourmap.png`);
        return this.process(img);
    }
    process(img) {
        let frame = img;
        const low1 = new cv.Vec3(0, 0, 120);
        const up1 = new cv.Vec3(180, 20, 255);
        const low2 = new cv.Vec3(140, 46, 6);
        const up2 = new cv.Vec3(170, 255, 255);

        frame = frame.cvtColor(cv.COLOR_BGR2HSV);
        const mask1 = frame.inRange(low1,up1);
        //const mask2 = frame.inRange(low2,up2);
        frame = mask1//.or(mask2);
        //frame = frame.blur(new cv.Size(10, 10));
        //frame = frame.threshold(200, 255, cv.THRESH_BINARY);
        return [cv.imencode('.jpg', frame).toString('base64'), cv.imencode('.jpg', img).toString('base64')];
    }
}

function create() {
    return new visionModule();
}

module.exports = create