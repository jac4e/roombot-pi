let socket = io();
let buttonint;
let gamepads;
let gamepad;
let up;
let down;
let left;
let right;

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
    if (up.pressed) {
        console.log('up');
        socket.emit('moveForward')
        return;
    }
    if (down.pressed) {
        console.log('down');
        socket.emit('moveBackward')
        return;
    }
    if (left.pressed) {
        console.log('left');
        socket.emit('turnLeft')
        return;
    }
    if (down.pressed) {
        console.log('right');
        socket.emit('turnRight')
        return;
    }
    console.log('stop');
    socket.emit('stop')
}

if (navigator.getGamepads().length) {
    buttonint = window.setInterval(buttonLoop, 500);
}
window.addEventListener("gamepadconnected", () => {
    buttonint = window.setInterval(buttonLoop, 500);
});
window.addEventListener("gamepaddisconnected", () => {
    clearInterval(buttonint)
});