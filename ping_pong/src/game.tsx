// import React, { useRef , useEffect} from 'react';
import React, { useEffect  } from 'react';

// import {Vector} from 'vector-ts'

// function drawRect(ctx: any, x: number, y: number, w: number, h: number, color: any){
//   ctx!.fillStyle = color;
//   ctx!.fillRect(x, y, w, h);
// }
// class player {
// 	// ctx:any;
// 	public x:number = 0;
// 	public y:number = 0;
// 	public width:number = 10;
// 	public height:number = 100;
// 	public color:any = "white";
// 	public score:number = 0;
// 	// constructor(ctx:any, id:number){
// 	// 	this.ctx = ctx;
// 	// 	this.score = 0;
// 	// 	if (id === 0){
// 	// 	  this.x = 0;
// 	// 	  this.y = ctx.canvas.height / 2 - 100 / 2;
// 	// 	}
// 	// 	else{
// 	// 	  this.x = ctx.canvas.width - 10;
// 	// 	  this.y = ctx.canvas.height / 2 - 100 / 2;
// 	//   }
// 	//   }
// 	//   drawRect_u(){
// 	//     drawRect(this.ctx, this.x, this.y, this.width, this.height, this.color);
// 	//   }
// 	top() { return (this.y); }
// 	bottom() { return (this.y + this.height) }
// 	left() { return (this.x) }
// 	right() { return (this.x + this.width) }
// }

// class ball{
//   ctx:any;
//   x:number = 0;
//   y:number = 0;
//   radius:number = 10;
//   speed:number = 5;
//   velocityX:number = 5;
//   velocityY:number = 5;
//   color:any = "white";
// 	//   constructor(ctx:any){
// 	//     this.ctx = ctx;
// 	//     this.x = ctx.canvas.width / 2;
// 	//     this.y = ctx.canvas.height / 2;
// 	//   }
// 	//   drawball_u(){
// 	//     drawCircle(this.ctx, this.x, this.y, this.radius, this.color);
// 	//   }

// 	top() { return (this.y - this.radius); }
// 	bottom() { return (this.y + this.radius) }
// 	left() { return (this.x - this.radius) }
// 	right() { return (this.x + this.radius) }
// 	reset(){
//     this.x = this.ctx.canvas.width / 2;
//     this.y = this.ctx.canvas.height / 2;
//     this.speed = 5;
//     this.velocityX *= -1;
//   }
// }

// type game_elem = {
// 	src:string;
// 	posision:number[];
// }

// class image_game  {
// 	player_left:game_elem;
// 	player_right:game_elem;
// 	ball:game_elem;
// 	ctx:any;
// 	width:number;
// 	height:number;
// 	bagroud_src: string = "illustrator/baground_tablejpg.jpg";
// 	constructor(width:number, height:number){
// 		this.player_left = {src:"illustrator/player_green.png", posision:[0, 0]};
// 		this.player_right = {src:"illustrator/player_red.png", posision:[0, 0]};
// 		this.ball = {src:"illustrator/ball.png", posision:[0, 0, 0]};
// 		// this.ctx = ctx;
// 		this.width = width;
// 		this.height = height;
// 	}
// 	render(ctx:any){
// 		ctx.drawImage(this.bagroud_src, 0, 0, 600, 400);
// 		// 	let net_ = new net(ctx);
// 		// drawRect(ctx, 0, 0, ctx!.canvas.width, ctx!.canvas.height, "black");
// 		// 	drawText(ctx, player_left.score, ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
// 		// 	drawText(ctx, player_right.score, 3 * ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
// 		// 	net_.drawRect_net();
// 		// 	player_left.drawRect_u();
// 		// 	player_right.drawRect_u();
// 		// 	ball_.drawball_u();
// 	}
// };

// class pong_back{
// 	width:number = 0;
// 	height:number = 0;
// 	player_leeft:player = new player();
// 	public_right:player = new player();
// 	_ball:ball = new ball();
// 	history = new Vector<number[]>();
// 	// canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
// 	constructor(width: number, height:number){
// 		this.width = width;
// 		this.height = height;
// 	}

// }

///************************************************* */

const Game: React.FC<{}> = () => {
	//   let i: number = 0;
	let canvasRef = React.useRef<HTMLCanvasElement | null>(null);
	// let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
	let width = 600;
	let height = 400;
	let img = new Image();
	img.src = "./illustrator/player_red.png";
	// let _game = new pong_back(width, height);
	// let image_game__ = new image_game(width, height);
	useEffect(() => {
		if (canvasRef?.current) {
			let ss = canvasRef?.current.getContext('2d');
			// const interval = setInterval(() => {
			let ctx = ss;
			ctx?.drawImage(img, 0, 0, 300, 200);
			console.log();
			//   ctx!.fillStyle = "green";
			//   ctx!.fillRect(0, 0, 100, 100);
			// image_game__.render(ctx);
			// render(interface);
			// }, 2000);
			// return () => clearInterval(interval);
		}
	}, [canvasRef]);
	// player.x = 5;
	// console.log(_game);
	// let h = this.targetElement.nativeElement.offsetHeight;
	// const [width, setWidth] = React.useState(0);
	// const [height, setHeight] = React.useState(0);
	// console.log("width =", canvasRef.current!.offsetWidth);
	// console.log("height =", canvasRef.current!.offsetHeight);
	// if (width < 600){
	//   setConstantValue({
	//     width : 600,
	//   })
	// }
	//   console.log("i =", i++);
	// useEffect(() => {
	//   setWidth(canvasRef.current!.offsetWidth);
	//   setHeight(canvasRef.current!.offsetHeight);
	// }, []);
	//   useEffect(() => {
	//     if (canvasRef.current) {
	//     canvasCtxRef.current = canvasRef.current.getContext('2d');
	//     let ctx = canvasCtxRef.current;
	//     let player_left= new user(ctx, 0);
	//     let player_right= new user(ctx, 1);
	//     let ball_ = new ball(ctx);
	//     const interval = setInterval(() => {
	//       update(ctx, ball_, player_left, player_right);
	//       render(ctx, player_left, player_right, ball_);
	//     }, 20);
	//     return () => clearInterval(interval);
	// 	}
	//   }, []);
  return (<canvas ref={canvasRef} width={width} height={height} ></canvas>);
};

// function render(ctx: any, player_left: user, player_right: user, ball_: ball){
// 	let net_ = new net(ctx);
// 	drawRect(ctx, 0, 0, ctx!.canvas.width, ctx!.canvas.height, "black");
// 	drawText(ctx, player_left.score, ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
// 	drawText(ctx, player_right.score, 3 * ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
// 	net_.drawRect_net();
// 	player_left.drawRect_u();
// 	player_right.drawRect_u();
// 	ball_.drawball_u();
// }






































































// import { networkInterfaces } from 'os';

// import React, { useRef, useEffect } from 'react';
// import { setConstantValue } from 'typescript';
// import { render } from '@testing-library/react';

// class user {
//   ctx:any;
//   x:number;
//   y:number;
//   width:number = 10;
//   height:number = 100;
//   color:any = "white";
//   score:number;
//   constructor(ctx:any, id:number){
//     this.ctx = ctx;
//     this.score = 0;
//     if (id === 0){
//       this.x = 0;
//       this.y = ctx.canvas.height / 2 - 100 / 2;
//     }
//     else{
//       this.x = ctx.canvas.width - 10;
//       this.y = ctx.canvas.height / 2 - 100 / 2;
//     }
//   }
//   drawRect_u(){
//     drawRect(this.ctx, this.x, this.y, this.width, this.height, this.color);
//   }
//   top() { return (this.y); }
//   bottom() { return (this.y + this.height) }
//   left() { return (this.x) }
//   right() { return (this.x + this.width) }
// }

// class net {
//   ctx:any;
//   x:number;
//   y:number;
//   width:number = 2;
//   height:number = 10;
//   color:any = "white";
//   constructor(ctx:any){
//     this.ctx = ctx;
//     this.x = ctx.canvas.width / 2 - 2 / 2;;
//     this.y = 0;
//   }
//   drawRect_net(){
//     for (let i = 0; i <= this.ctx.canvas.height ; i += 15){
//       drawRect(this.ctx, this.x, this.y + i, this.width, this.height, this.color);
// 	}
//   } 
// }

// class ball{
//   ctx:any;
//   x:number;
//   y:number;
//   radius:number = 10;
//   speed:number = 5;
//   velocityX:number = 5;
//   velocityY:number = 5;
//   color:any = "white";
//   constructor(ctx:any){
//     this.ctx = ctx;
//     this.x = ctx.canvas.width / 2;
//     this.y = ctx.canvas.height / 2;
//   }
//   drawball_u(){
//     drawCircle(this.ctx, this.x, this.y, this.radius, this.color);
//   }

//   top() { return (this.y - this.radius); }
//   bottom() { return (this.y + this.radius) }
//   left() { return (this.x - this.radius) }
//   right() { return (this.x + this.radius) }
//   reset(){
//     this.x = this.ctx.canvas.width / 2;
//     this.y = this.ctx.canvas.height / 2;
//     this.speed = 5;
//     this.velocityX *= -1;
//   }
// }

// function update(ctx: any, __ball:ball,player_left:user, player_right:user)
// {
//   if (__ball.left() < 0){
//     player_right.score++;
//     __ball.reset();
//   }
//   else if (__ball.right() > ctx.canvas.width){
//     player_left.score++;
//     __ball.reset();
//   }
//   __ball.x += __ball.velocityX;
//   __ball.y += __ball.velocityY;
//   player_right.y += ((__ball.y - (player_right.y +  player_right.height / 2))) * 0.1;
//   player_left.y = player_right.y + 1;
//   if (__ball.top() < 0 || __ball.bottom() > ctx.canvas.height){
//     __ball.velocityY *= -1;
//   }
//   __ball.x += __ball.velocityX;
// 	__ball.y += __ball.velocityY;
// 	if (__ball.y + __ball.radius > ctx!.canvas.height ||
// 		__ball.y - __ball.radius < 0)
// 	{
// 		__ball.velocityY *= -1;
// 	}
//   let player = (__ball.x < ctx.canvas.width / 2) ? player_left : player_right;
//   if (collision(__ball, player)){
//     let collidPoint = (__ball.y - (player.y + player.height / 2));
//     collidPoint = collidPoint / (player.height / 2);
//     let angleRad = (Math.PI / 4) * collidPoint;
//     let direction = (__ball.x < ctx.canvas.width / 2) ? 1 : -1;
//     __ball.velocityX = direction * __ball.speed * Math.cos(angleRad);
//     __ball.velocityY = direction * __ball.speed * Math.sin(angleRad);
//     __ball.speed += 0.1;
//   }
// }


// function collision(_ball: ball, player:user){
// 	return (_ball.right() > player.left()  && _ball.top() < player.bottom() &&
// 		_ball.top() < player.bottom() && _ball.left() < player.right());
// }

// const Game: React.FC<{}> = () => {
//   let i: number = 0;
//   let canvasRef = useRef<HTMLCanvasElement | null>(null);
//   let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
//   // let h = this.targetElement.nativeElement.offsetHeight;
//   // const [width, setWidth] = React.useState(0);
//   // const [height, setHeight] = React.useState(0);
//   // console.log("width =", canvasRef.current!.offsetWidth);
//   // console.log("height =", canvasRef.current!.offsetHeight);
//   // if (width < 600){
//   //   setConstantValue({
//   //     width : 600,
//   //   })
//   // }
//   console.log("i =", i++);
//   // useEffect(() => {
//   //   setWidth(canvasRef.current!.offsetWidth);
//   //   setHeight(canvasRef.current!.offsetHeight);
//   // }, []);
//   useEffect(() => {
//     if (canvasRef.current) {
//     // canvasCtxRef.current = canvasRef.current.getContext('2d');
//     // let ctx = canvasCtxRef.current;
//     // let player_left= new user(ctx, 0);
//     // let player_right= new user(ctx, 1);
//     // let ball_ = new ball(ctx);
//     const interval = setInterval(() => {
//     //   update(ctx, ball_, player_left, player_right);
//     //   render(ctx, player_left, player_right, ball_);
//     }, 20);
//     return () => clearInterval(interval);
// 	}
//   }, []);
//   return (<canvas ref={canvasRef} ></canvas>);
// };

// function drawRect(ctx: any, x: number, y: number, w: number, h: number, color: any){
//   ctx!.fillStyle = color;
//   ctx!.fillRect(x, y, w, h);
// }

// function drawCircle(ctx: any, x: number, y: number, r: number, color: any){
//     ctx!.fillStyle = color;
//     ctx!.beginPath();
//     ctx!.arc(x, y, r, 0, Math.PI * 2, false);
//     ctx!.closePath();
//     ctx!.fill();
// }

// function drawText(ctx: any, text: any, x: number, y: number, color: any){
//     ctx!.fillStyle = color;
//     ctx!.font = "75px fantasy";
//     ctx!.fillText(text, x, y);
// }

// function render(ctx: any, player_left: user, player_right: user, ball_: ball){
// 	let net_ = new net(ctx);
// 	drawRect(ctx, 0, 0, ctx!.canvas.width, ctx!.canvas.height, "black");
// 	drawText(ctx, player_left.score, ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
// 	drawText(ctx, player_right.score, 3 * ctx!.canvas.width/4, ctx!.canvas.height/5, "white");
// 	net_.drawRect_net();
// 	player_left.drawRect_u();
// 	player_right.drawRect_u();
// 	ball_.drawball_u();
// }

export default Game;
