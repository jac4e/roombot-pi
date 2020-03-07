const cv = require('opencv4nodejs');

class visionModule {
    constructor() {
        this.camera = new cv.VideoCapture(0);
        this.prevFrame;
    }
    cameraRead() {
        return this.camera.read();
    }
    matchFeature(newFrame) {
        if (this.prevFrame) {
            const curr = newFrame.resize(360,640);
            const prev = this.prevFrame;
            const orb = new cv.ORBDetector();
            const kpC = orb.detect(curr);
            const kpP = orb.detect(this.prevFrame);
            const descC = orb.compute(curr, kpC).convertTo(cv.CV_32F);
            const descP = orb.compute(prev, kpP).convertTo(cv.CV_32F);
            const matches = cv.matchKnnFlannBased(descP,descC,2);
            let good = new Array();
            for (let m = 0; m<matches.length; m++){
                if (matches[m][0].distance < 0.7*matches[m][1].distance) {
                    good.push(matches[m][0]);
                }
            }
            // let ptsCurr = new Array();
            // let ptsPrev = new Array();
            for (let mat of good) {
                const currIdx = mat.trainIdx;
                const prevIdx = mat.queryIdx;
                const dx = kpC[currIdx].pt.x - kpP[prevIdx].pt.x;
                const dy = kpC[currIdx].pt.y - kpP[prevIdx].pt.y;
                console.log(dx,dy);
                // ptsCurr.push(kpC[currIdx].point);
                // ptsPrev.push(kpP[prevIdx].point);
            }
            const draw = cv.drawMatches(prev,curr,kpP,kpC,good);
            this.prevFrame = curr;
            return [cv.imencode('.jpg', draw).toString('base64')];
        } else {
            this.prevFrame = newFrame.resize(360,640);
            return [0];
        }
    }
}
// Use dected booundries and previous position, gyro and acceleromator to track itself within the boundries

function create() {
    return new visionModule();
}

module.exports = create;

// Most logical idea:
// Up facing camere that uses optical flow to 





