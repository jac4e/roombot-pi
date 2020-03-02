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
    }
    if (down.pressed) {
        console.log('down');
        socket.emit('moveBackward')
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