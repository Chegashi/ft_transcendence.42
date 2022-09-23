// import { networkInterfaces } from 'os';
import React, { useRef, useEffect } from 'react';

class user {
  ctx:any;
  x:number;
  y:number;
  width:number = 10;
  height:number = 100;
  color:any = "white";
  score:number;
  constructor(ctx:any, id:number){
    this.ctx = ctx;
    this.score = 0;
    if (id === 0){
      this.x = 0;
      this.y = ctx.canvas.height / 2 - 100 / 2;
    }
    else{
      this.x = ctx.canvas.width - 10;
      this.y = ctx.canvas.height / 2 - 100 / 2;
    }
  }
  drawRect_u(){
    drawRect(this.ctx, this.x, this.y, this.width, this.height, this.color);
  }
  top() { return (this.y); }
  bottom() { return (this.y + this.height) }
  left() { return (this.x) }
  right() { return (this.x + this.width) }
}

class net {
  ctx:any;
  x:number;
  y:number;
  width:number = 2;
  height:number = 10;
  color:any = "white";
  constructor(ctx:any){
    this.ctx = ctx;
    this.x = ctx.canvas.width / 2 - 2 / 2;;
    this.y = 0;
  }
  drawRect_net(){
    for (let i = 0; i <= this.ctx.canvas.height ; i += 15){
      drawRect(this.ctx, this.x, this.y + i, this.width, this.height, this.color);
	}
  } 
}

class ball{
  ctx:any;
  x:number;
  y:number;
  radius:number = 10;
  speed:number = 5;
  velocityX:number = 5;
  velocityY:number = 5;
  color:any = "white";
  constructor(ctx:any){
    this.ctx = ctx;
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height / 2;
  }
  drawball_u(){
    drawCircle(this.ctx, this.x, this.y, this.radius, this.color);
  }

  top() { return (this.y - this.radius); }
  bottom() { return (this.y + this.radius) }
  left() { return (this.x - this.radius) }
  right() { return (this.x + this.radius) }
  reset(){
    this.x = this.ctx.canvas.width / 2;
    this.y = this.ctx.canvas.height / 2;
    this.speed = 5;
    this.velocityX *= -1;
  }
}

function update(ctx: any, __ball:ball,player_left:user, player_right:user)
{
  if (__ball.left() < 0){
    player_right.score++;
    __ball.reset();
  }
  else if (__ball.right > ctx.canvas.width){
    player_left.score++;
    __ball.reset();
  }
  __ball.x += __ball.velocityX;
  __ball.y += __ball.velocityY;
  player_left.y = player_right.y += ((__ball.y - (player_right.height / 2))) * 0.1;
  if (__ball.top() < 0 || __ball.bottom() > ctx.canvas.height){
    __ball.velocityY *= -1;
  }
  __ball.x += __ball.velocityX;
	__ball.y += __ball.velocityY;
	if (__ball.y + __ball.radius > ctx!.canvas.height ||
		__ball.y - __ball.radius < 0)
	{
		__ball.velocityY *= -1;
	}
  let player = (__ball.x < ctx.canvas.width / 2) ? player_left : player_right;
  if (collision(__ball, player)){
    let collidPoint = (__ball.y - (player.y + player.height / 2));
    collidPoint = collidPoint / (player.height / 2);
    let angleRad = (Math.PI / 4) * collidPoint;
    let direction = (__ball.x < ctx.canvas.width / 2) ? 1 : -1;
    __ball.velocityX = direction * __ball.speed * Math.cos(angleRad);
    __ball.velocityY = direction * __ball.speed * Math.sin(angleRad);
    __ball.speed += 0.1;
  }
}


function collision(_ball: ball, player:user){
	return (_ball.right() > player.left()  && _ball.top() < player.bottom() &&
		_ball.top() < player.bottom() && _ball.left() < player.right());
}

const Game: React.FC<{}> = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
    canvasCtxRef.current = canvasRef.current.getContext('2d');
    let ctx = canvasCtxRef.current;
    let player_left= new user(ctx, 0);
    let player_right= new user(ctx, 1);
    let ball_ = new ball(ctx);
    update(ctx, ball_, player_left, player_right);
    const interval = setInterval(() => {
      render(ctx, player_left, player_right, ball_);
      console.log(1);
    }, 20);
    return () => clearInterval(interval);
	}
  }, []);
  return (<canvas ref={canvasRef} width="600" height="400" ></canvas>);
};

function drawRect(ctx: any, x: number, y: number, w: number, h: number, color: any){
  ctx!.fillStyle = color;
  ctx!.fillRect(x, y, w, h);
}

function drawCircle(ctx: any, x: number, y: number, r: number, color: any){
    ctx!.fillStyle = color;
    ctx!.beginPath();
    ctx!.arc(x, y, r, 0, Math.PI * 2, false);
    ctx!.closePath();
    ctx!.fill();
}

function drawText(ctx: any, text: any, x: number, y: number, color: any){
    ctx!.fillStyle = color;
    ctx!.font = "75px fantasy";
    ctx!.fillText(text, x, y);
}

function render(ctx: any, player_left: user, player_right: user, ball_: ball){
	let net_ = new net(ctx);
	drawRect(ctx, 0, 0, ctx!.canvas.width, ctx!.canvas.height, "black");
	drawText(ctx, player_left.score, ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
	drawText(ctx, player_right.score, 3 * ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
	net_.drawRect_net();
	player_left.drawRect_u();
	player_right.drawRect_u();
	ball_.drawball_u();
}

export default Game;
