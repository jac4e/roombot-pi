const boardModule = require("./modules/boardModule.js");
const trackingModule  = require("./modules/trackingModule.js")
const { Matrix } = require('ml-matrix');
const fs = require('fs');
const pi = boardModule();

const dt = 0.1;
const kalman = trackingModule(dt);

const A = new Matrix([
    [1, 0, dt, 0],
    [0, 1, 0, dt],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]);
const B = new Matrix([
    [(dt ^ 2) / 2, 0],
    [0, (dt ^ 2) / 2],
    [dt, 0],
    [0, dt]
]);
const C = new Matrix([
    [1,0,0,0],
    [0,1,0,0]
]);

function interval() {
    pi.initSensors();
    setInterval(() => {
        pi.readAccel("X",(aX) => {
            pi.readAccel("Y"),(aY) => { 
                data.push([aX,aY]);
                const input = new Matrix([[aX],[aY]]);
                const m = new Matrix( [ [aX * ( (dt^2)/2 )], [aY * ( (dt^2)/2 )] , [aX * (dt)] , [aY * (dt)] ] );
                const m2 = Matrix.zeroes(1,4)
                kalman.update(input,m,A,B,C);
            }
        });
        if (data.length > 1000) {
            storeData(data);
        }
    },100);
}

function storeData(d) {
	fs.writeFileSync(`${__dirname}/sensorData.json`, JSON.stringify(d));
}