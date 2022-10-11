import React, { useEffect, useRef } from 'react';
//import _ball_img from './assets/ball.png';
//import _baground_img from './assets/baground_table.jpg';
//import _player_left_img from './assets/player_red.png';
//import _player_right_img from './assets/player_red.png';

interface player{
	x:number;
	y:number;
	width:number;
	height:number;
	score:number;
}	

interface ball{
	x:number;
	y:number;
	radius:number;
	speed:number;
	velocity_X:number;
	velocity_Y:number;
}

interface posistion{
	player_l:number;
	player_r:number;
	_ball:number[];
}

class pong{	
	player_left:player;
	player_right:player;
	how_play:player;
	_ball:ball;
	canvas_taille:number[];
	net:{x:number, y:number, width:number, height:number,
		color:any};
	constructor(width:number, height:number){
		this.canvas_taille = [width, height];
		this.player_left = {x:0, y:height / 2 - 100 / 2, width:10, height:100, score:0};
		this.player_right = {x:width - 10, y:height / 2 - 100 / 2, width:10, height:100, score:0};
		this._ball = {x:width / 2, y:height / 2, radius:10, speed:5,
					velocity_X:5, velocity_Y:5};
		this.how_play = this.player_right;
		this.net = {x:width / 2 - 2 / 2, y:0, width:2, height:10, color:"white"};
	}
	ball_top_pos = ():number => { return (this._ball.y - this._ball.radius); }
	ball_bottom_pos = ():number => { return (this._ball.y + this._ball.radius); }
	ball_left_pos = ():number => { return (this._ball.x - this._ball.radius); }
	ball_right_pos = ():number => { return (this._ball.x + this._ball.radius); }
	player_top_pos = (player:player):number => { return (player.y); }
	player_bottom_pos = (player:player):number => { return (player.y + player.height); }
	player_left_pos = (player:player):number => { return (player.x); }
	player_right_pos = (player:player):number => { return (player.x + player.width); }
	get_position = ():posistion => {
		return {player_l:this.player_left.x, player_r:this.player_right.y,
				_ball:[this._ball.x, this._ball.y]};
	}
	reset = () => {
		this._ball.x = this.canvas_taille[0] / 2;
		this._ball.y = this.canvas_taille[1] / 2;
		this._ball.velocity_X = -this._ball.velocity_X;
		this._ball.speed = 5;
	}
	update = ():posistion => {
		if (this.ball_left_pos() < 0)
		{
			this.player_right.score++;
			this.reset();
		}
		else if (this.ball_right_pos() > this.canvas_taille[0])
		{
			this.player_left.score++;
			this.reset();
		}
		this._ball.x += this._ball.velocity_X;
		this._ball.y += this._ball.velocity_Y;
		this.player_right.y += ((this._ball.y - (this.player_right.y
								+ this.player_right.height / 2))) * 0.1;
		this.player_left.y = this.player_right.y;
		if (this.ball_top_pos() < 0
			|| this.ball_bottom_pos() > this.canvas_taille[1]){
				this._ball.velocity_Y *= -1;
		}
		this._ball.x += this._ball.velocity_X;
		this._ball.y += this._ball.velocity_Y;
		if (this._ball.y + this._ball.radius > this.canvas_taille[1]
			|| this._ball.y - this._ball.radius < 0)
		{
			this._ball.velocity_Y *= -1;
		}
		this.how_play = (this._ball.x < this.canvas_taille[0] / 2) ?
			this.player_left : this.player_right;
		if (this.collision()){
			let collide_point = (this._ball.y
				- (this.how_play.y + this.how_play.height / 2));
			collide_point /= (this.how_play.height / 2);
			let angleRad = (Math.PI / 4) * collide_point;
			let direction = (this._ball.x < this.canvas_taille[0] / 2) ? 1 : -1;
			this._ball.velocity_X = direction * this._ball.speed * Math.cos(angleRad);
			this._ball.velocity_Y = this._ball.speed * Math.sin(angleRad);
			this._ball.speed += 0.1;
		}
		return this.get_position();
	}
	collision = ():boolean => {
		return(this.ball_right_pos() > this.player_left_pos(this.how_play)
			&& this.ball_top_pos() < this.player_bottom_pos(this.how_play)
			&& this.ball_left_pos() < this.player_right_pos(this.how_play));
	}
	to_render = ():any => {
		const obj : {taille:number[], __ball__:ball, player_l:player,
			player_r:player, net:any} = {
			taille:this.canvas_taille, __ball__:this._ball, player_l:this.player_left,
			player_r:this.player_right, net:this.net};
		return (obj);
	}
}

function render(ctx:any, game_state:any){
	//ctx.drawImage(img[0], 0, 0, game_state.taille[0], game_state.taille[1]);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, game_state.taille[0], game_state.taille[1]);
	
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "white";
	ctx.fillText(game_state.player_l.score.toString(),
		game_state.taille[0] / 4, game_state.taille[1] / 6);
	ctx.fillText(game_state.player_r.score.toString(),
		game_state.taille[0] * 3 / 4, game_state.taille[1] / 6);
	ctx.fillStyle = "white";
    for (let i = 0; i <= game_state.taille[0] ; i += 15)
    	ctx.fillRect(game_state.net.x ,game_state.net.y + i,
			game_state.net.width, game_state.net.height);

	//ctx.drawImage(img[2], game_state.player_l.x, game_state.player_l.y, game_state.player_l.width, game_state.player_l.height);
	ctx.fillStyle = "red";
	ctx.fillRect(game_state.player_l.x ,game_state.player_l.y,
		game_state.player_l.width, game_state.player_l.height);

	//ctx.drawImage(_player_right_img, game_state.player_r.x, game_state.player_r.y, game_state.player_r.width, game_state.player_r.height);
	ctx.fillStyle = "green"; 
	ctx.fillRect(game_state.player_r.x , game_state.player_r.y,
		game_state.player_r.width, game_state.player_r.height);

	//ctx.drawImage(_ball_img, game_state.__ball__.x, game_state.__ball__.y, game_state.__ball__.radius, game_state.__ball__.radius);
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(game_state.__ball__.x, game_state.__ball__.y,
		game_state.__ball__.radius, 0, 2 * Math.PI);
    ctx.closePath();
	ctx.fill();
}
export default function Game(props:any){
	let canvasRef = useRef<HTMLCanvasElement | null>(null);
	let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
	useEffect(() => {
		if (canvasRef.current) {
			canvasCtxRef.current = canvasRef.current.getContext('2d');
			let ctx = canvasCtxRef.current;
			let new_game = new pong(props.width, props.height);
			let histoy_game: any[] = [];
			histoy_game.push(new_game.to_render());
			const interval = setInterval(() => {
				histoy_game.push(new_game.update());
				render(ctx, new_game.to_render());
				if (new_game.player_left.score === 5 || new_game.player_right.score === 5){
					new_game.reset();
					render(ctx, new_game.to_render());
					clearInterval(interval);
				}
			}, 1000 / 60);
			return () => clearInterval(interval);
		}
	}, [props.width, props.height]);

	return (<canvas ref={canvasRef} width={props.width} height={props.height} ></canvas>);
}