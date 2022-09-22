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
  color:any = "white";
  constructor(ctx:any){
    this.ctx = ctx;
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height / 2;
  }
  drawball_u(){
    drawCircle(this.ctx, this.x, this.y, this.radius, this.color);
  } 
}

const Game: React.FC<{}> = () => {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;
      let u_1= new user(ctx, 0);
      let u_2= new user(ctx, 1);
      let ball_ = new ball(ctx);
	  render(ctx, u_1, u_2, ball_);
	  console.log(u_1);
	  console.log(u_2);
    }
  }, []);
  return <canvas ref={canvasRef} width="600" height="400" ></canvas>;
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

function render(ctx: any, u_1: user, u_2: user, ball_: ball){
	let net_ = new net(ctx);
	drawRect(ctx, 0, 0, ctx!.canvas.width, ctx!.canvas.height, "black");
	drawText(ctx, u_1.score, ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
	drawText(ctx, u_2.score, 3 * ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
	net_.drawRect_net();
	u_1.drawRect_u();
	u_2.drawRect_u();
	ball_.drawball_u();
}

export default Game;
