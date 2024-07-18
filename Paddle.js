const SIDE = {NONE: 0, LEFT:1, RIGHT: 2};
const paddleHitSound = document.getElementById('paddlehitsound');

class Paddle {
    constructor(x,y,l,w,side, c){
        this.x=x;
        this.y=y;
        this.l=l;
        this.w=w;
        this.side=side;
        this.c=c;
        this.vy=0;
        this.powerUp = 1;
    }

    draw(ctx){
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.w, this.l, [100]); 
        ctx.stroke();
        ctx.fill()
    }

    move(isCPU){
        if(isCPU){
            if(ball.y < this.y+(paddleLength/2)) {
                this.vy = paddleVelocity*-1;
            }
            if(ball.y > this.y+(paddleLength/2)){
                this.vy = paddleVelocity;
            }
            
            
            

            //ball.y <--where the ball is 
            //this.y <--- where the paddle is at
            //this.l <-- paddle lenght


            //control this.vy using ball
            // dont set this.y
        }
        this.y += this.vy * this.powerUp;
        if (this.y < 0) this.y=0;
        if (this.y + this.l > boardHeight) this.y = boardHeight - this.l;


    }
}
