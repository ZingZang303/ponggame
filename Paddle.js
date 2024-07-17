const SIDE = {NONE: 0, LEFT:1, RIGHT: 2};



class Paddle {
    constructor(x,y,l,w,side, c){
        this.x=x;
        this.y=y;
        this.l=l;
        this.w=w;
        this.side=side;
        this.c=c;
        this.vy=0;
    }

    draw(ctx){
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2;
        
        ctx.fillRect(this.x, this.y, this.w, this.l,); //Not H
        ctx.strokeRect(this.x, this.y, this.w, this.l);
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
        this.y += this.vy;
        if (this.y < 0) this.y=0;
        if (this.y + this.l > boardHeight) this.y = boardHeight - this.l;


    }
}
