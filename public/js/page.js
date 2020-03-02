let socket = io();
let buttonint;
let gamepads;
let gamepad;
let up;
let down;
let left;
let right;
let upEmit;
let downEmit;
let leftEmit;
let rightEmit;

function updateGamepad() {
    gamepads = navigator.getGamepads();
    gamepad = gamepads[0];
    up = gamepad.buttons[14];
    down = gamepad.buttons[15];
    left = gamepad.buttons[16];
    right = gamepad.buttons[17];
}

function buttonLoop() {
    updateGamepad()
    if (up.pressed & !upEmit) {
        console.log('up');
        socket.emit('moveForward')
        upEmit = true;
        return;
    } else if (!up.pressed & upEmit) {
        upEmit = false;
        console.log('stop');
        socket.emit('stop');
    }
    if (down.pressed & !downEmit) {
        console.log('down');
        socket.emit('moveBackward')
        downEmit = true;
        return;
    } else if (!down.pressed & downEmit) {
        downEmit = false;
        console.log('stop');
        socket.emit('stop');
    }
    if (left.pressed & !leftEmit) {
        console.log('left');
        socket.emit('turnLeft')
        leftEmit = true;
        return;
    } else if (!left.pressed & leftEmit) {
        leftEmit = false;
        console.log('stop');
        socket.emit('stop');
    }
    if (right.pressed & !rightEmit) {
        console.log('right');
        socket.emit('turnRight')
        rightEmit = true;
        return;
    } else if (!right.pressed & rightEmit) {
        rightEmit = false;
        console.log('stop');
        socket.emit('stop');
    }
}

if (navigator.getGamepads().length) {
    buttonint = window.setInterval(buttonLoop, 10);
}
window.addEventListener("gamepadconnected", () => {
    buttonint = window.setInterval(buttonLoop, 10);
});
window.addEventListener("gamepaddisconnected", () => {
    clearInterval(buttonint)
});