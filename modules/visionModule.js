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
        let frame = img.resize(360,640);
        // const low1 = new cv.Vec3(90, 19, 223);
        // const up1 = new cv.Vec3(108, 88, 253);
        // const low2 = new cv.Vec3(95, 12, 120);
        // const up2 = new cv.Vec3(115, 30, 180);

        // frame = frame.blur(new cv.Size(10, 10));
        // frame = frame.cvtColor(cv.COLOR_BGR2HSV);
        // const mask1 = frame.inRange(low1, up1);
        // const mask2 = frame.inRange(low2,up2);
        // frame = mask1.or(mask2);
        // frame = frame.threshold(, 255, cv.THRESH_BINARY);
        frame = frame.cvtColor(cv.COLOR_BGR2GRAY);
        let frameBlur = frame.gaussianBlur(new cv.Size(9,9),3);
        frame = frameBlur.canny(0,120);
        return [cv.imencode('.jpg', frame).toString('base64'), cv.imencode('.jpg', frameBlur).toString('base64')];
    }
    getBounderies() {
        // How image processing should hopefully work
        // Colour mask floor, use canny edge detector and hough line transforms to detect boundries
    }
}
// Use dected booundries and previous position, gyro and acceleromator to track itself within the boundries

function create() {
    return new visionModule();
}

module.exports = create
// RGB
// 210,253,253
// 175,212,251
// 229,244,247
// 146,177,223
// HSV(need to h / 2 s and v /100 * 255)
// 90,43,99.2
// 105,77,98.4
// 95,19,96.9
// 108,88,87.5





