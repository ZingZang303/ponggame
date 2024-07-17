const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const ctx = gameboard.getContext("2d");
const STATE = {STARTUP: 0, PLAYING: 1, SERVING: 2, GAMEOVER: 3};

let state = STATE.STARTUP;

let boardWidth = 500;
let boardHeight = 500;
let paddleWidth = 20;
let paddleLength = 100;
let ballRadius = 10;
let paddleVelocity = 5;
let paddleForce= 1.1; //110% speed 

let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;

function clearBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, boardWidth, boardHeight);
}

function draw() {
    clearBoard();
    if(ball instanceof Ball)
        ball.draw(ctx);
    paddleL.draw(ctx);
    paddleR.draw(ctx);
}

function resetGame() {
    state = STATE.STARTUP;
    clearInterval(intervalID);
    resetBall();
    paddleL = new Paddle(0,(boardHeight/2)-(paddleLength/2), paddleLength, paddleWidth, SIDE.LEFT, "red");
    paddleR = new Paddle(boardWidth-paddleWidth, (boardHeight/2)-(paddleLength/2), paddleLength, paddleWidth, SIDE.RIGHT, "green");

    nextTick();
}

function resetBall() {
    ball = new Ball(boardWidth/2, boardHeight/2, -1, 0, ballRadius, "yellow");
    
}



let intervalID;
function nextTick() {
    switch(state) {
        case STATE.STARTUP:
            state = STATE.SERVING;
            break;
        case STATE.PLAYING:
            state = play();
            break;
        case STATE.SERVING:
            state = serve();
            break;
        case STATE.GAMEOVER:
            state = STATE.GAMEOVER;
            break;
        default: 
            state = STATE.STARTUP;
            break;
    }
    draw();
    intervalID = setTimeout(nextTick, 10);
}

let scoreSide;
function play() {
    
    
    paddleL.move(false, ball);
    paddleR.move(cpucheck.checked, ball);
    scoreSide = ball.bounce([paddleL, paddleR]);
    if(scoreSide != SIDE.NONE) {
        if(scoreSide == SIDE.LEFT) {
            scoreL++;
            // ball = null;
            serveSide = SIDE.LEFT;
        } 
        if(scoreSide == SIDE.RIGHT){ 
            scoreR++;
            // ball = null;
            serveSide = SIDE.RIGHT;
        }
        updateScore();
        //resetBall();

        if(scoreL > 10 || scoreR > 10) return STATE.GAMEOVER;
        return STATE.SERVING;
    }
    ball.move();
    //Add serving the ball?
    // If a player wins, stop the game....
    return STATE.PLAYING;
}

let serveSide = SIDE.LEFT;
let serveBallUpL = false;
let serveBallDownL = false;
let serveBallUpR = false;
let serveBallDownR = false;
function serve() {
    if(ball instanceof Ball) {
        //create new ball depending on serve side
        if(serveSide == SIDE.LEFT){
            // ball = Ball(paddleWidth, paddleL.y+paddleLength, 0, 0, ballRadius, "yellow");
            ball.x = paddleWidth + ball.r;
            ball.y = paddleL.y+(paddleLength/2);
            ball.vx = 0;
            ball.vy = 0;
        }

        if(serveSide == SIDE.RIGHT){
            // ball = Ball(500-paddleWidth, paddleR.y+paddleLength, 0, 0, ballRadius, "yellow");
            ball.x = 500-paddleWidth- ball.r;
            ball.y = paddleR.y+(paddleLength/2);
            ball.vx = 0;
            ball.vy = 0;
            }
    }
    if(serveSide == SIDE.LEFT) {
        if(serveBallUpL) {
            ball.vx = 2;
            ball.vy = -Math.random()*2 - 1;
            //give the ball a velocity
            return STATE.PLAYING;
        }
        if(serveBallDownL) {
            ball.vx = 2;
            ball.vy = Math.random()*2 + 1;
            //give the ball a velocity
            return STATE.PLAYING;
        }
    }
    if(serveSide == SIDE.RIGHT) {
        if(serveBallUpR) {
            ball.vx = -2;
            ball.vy = -Math.random()*2 - 1;
            //give the ball a velocity
            return STATE.PLAYING;
        }
        if(serveBallDownR) {
            ball.vx = -2;
            ball.vy = Math.random()*2 + 1;
            //give the ball a velocity
            return STATE.PLAYING;
        }
    }
    
    return STATE.SERVING;
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`;
}