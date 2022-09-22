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
    if (id == 0){
      this.x = 0;
      this.y = ctx.canvas.height / 2 - 100 / 2;
    }
    else{
      this.y = ctx.canvas.height / 2 - 100 / 2;
      this.x = ctx.canvas.widht - 10;
    }
  }
  drawRect_u(){
    drawRect(this.ctx, this.x, this.y, this.width, this.height, this.color);
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
      u_1.drawRect_u();
      let u_2= new user(ctx, 1);
      u_2.drawRect_u();
    }
  }, []);
  return <canvas ref={canvasRef} ></canvas>;
};

function drawRect(ctx: any, x: number, y: number, w: number, h: number, color: any){
    ctx!.fillStyle = color;
    ctx!.fillRect(x, y, w, h);
}

// function drawCircle(ctx: any, x: number, y: number, r: number, color: any){
//     ctx!.fillStyle = color;
//     ctx!.beginPath();
//     ctx!.arc(x, y, r, 0, Math.PI * 2, false);
//     ctx!.closePath();
//     ctx!.fill();
// }

// function drawText(ctx: any, text: string, x: number, y: number, color: any){
//     ctx!.fillStyle = color;
//     ctx!.font = "75px fantasy";
//     ctx!.fillText(text, x, y);
// }

// function render(ctx: any){
    // drawRect(ctx, 0, 0, 600, 400, "black");
    
// }

export default Game;
