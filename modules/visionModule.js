const cv = require('opencv4nodejs');

class visionModule {
    constructor() {
        this.camera = new cv.VideoCapture(0);32F
        this.prevFrame;
    }
    cameraRead(h,w) {
        return this.camera.read()//.resize(h,w);
    }
    matchFeature(newFrame) {
        if (this.prevFrame) {
            const curr = newFrame;
            const prev = this.prevFrame;
            const orb = new cv.ORBDetector();
            const kpC = orb.detect(curr);
            const kpP = orb.detect(this.prevFrame);
            const descC = orb.compute(curr, kpC).convertTo(cv.CV_32F);
            const descP = orb.compute(prev, kpP).convertTo(cv.CV_32F);
            const matches = cv.matchKnnFlannBased(descP,descC,2);
            let good = new Array();
            let currPts = new Array();
            let prevPts = new Array();
            for (let m = 0; m<matches.length; m++){
                if (matches[m][0].distance < 0.7*matches[m][1].distance) {
                    good.push(matches[m][0]);
                    currPts.push(kpC[matches[m][0].trainIdx].pt);
                    prevPts.push(kpP[matches[m][0].queryIdx].pt);
                }
            }
            const homo = cv.findHomography(prevPts,currPts,8)
            const norm = homo.homography.decomposeHomographyMat(k) // will need to calibrate the camera for k
            const draw = cv.drawMatches(prev,curr,kpP,kpC,good);
            homo.perspectiveTransform()
            this.prevFrame = curr;
            return [cv.imencode('.jpg', draw).toString('base64')];
        } else {
            this.prevFrame = newFrame;
            return [0];
        }
    }
}

function create() {
    return new visionModule();
}

module.exports = create;

// Most logical idea:
// Up facing camere that uses optical flow to 





