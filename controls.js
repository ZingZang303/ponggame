window.addEventListener("keydown", keyDown);
function keyDown(event) {
    const key = event.code;
    console.log(`KEYDOWN: ${key}`);

     switch (key) {
        case "KeyW":
            paddleL.vy = -paddleVelocity;
            serveBallUpL = true;
            break;
        case "KeyS":
            paddleL.vy = paddleVelocity;
            serveBallDownL = true;
            break;
        case "ArrowUp":
            paddleR.vy = -paddleVelocity;
            serveBallUpR = true;
            break;
        case "ArrowDown":
            paddleR.vy = paddleVelocity;
            serveBallDownR = true;
            break;
        case "KeyR":
            resetGame();
            break;

     }
}


window.addEventListener("keyup", keyUp);
function keyUp(event) {
    const key = event.code;
    //console.log(`KEYUP: ${key}`);

     switch (key) {
        case "KeyW":
            paddleL.vy = 0;
            serveBallUpL = false;
            break;
        case "KeyS":
            paddleL.vy = 0;
            serveBallDownL = false;
            break;
        case "ArrowUp":
            paddleR.vy = 0;
            serveBallUpR = false;
            break;
        case "ArrowDown":
            paddleR.vy = 0;
            serveBallDownR = false;
            break;
     }
}

