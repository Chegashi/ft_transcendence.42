import Sketch from 'react-p5';
import p5Types from 'p5';
import _ball_img from './assets/ball.png';
import _baground_img from './assets/baground_table.jpg';
import _player_left_img from './assets/player_red.png';
import _player_right_img from './assets/player_green.png';

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
	constructor(width:number, height:number){
		this.canvas_taille = [width, height];
		this.player_left = {x:width / 100, y:height * 3 / 8, width:width / 60,
			height:height / 4, score:0};
		this.player_right = {x:width * 73 / 75, y:height * 3 / 8, width:10,
			height:100, score:0};
		this._ball = {x:width * 0.48, y:height * 0.5, radius:width * 0.02,
			speed:width / 120 , velocity_X:width / 120, velocity_Y:width / 120};
		this.how_play = this.player_right;
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
		this._ball.x = this.canvas_taille[0] * 0.48;
		this._ball.y = this.canvas_taille[1] * 0.5;
		this._ball.velocity_X = -this._ball.velocity_X;
		this._ball.speed = this.canvas_taille[0] / 120;
		this.player_left.y = this.canvas_taille[1] * 3 / 8;
		this.player_right.y = this.canvas_taille[1] * 3 / 8;
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
}

export default function Game(props:any){
		let new_game = new pong(props.width, props.height);
		let histoy_game: any[] = [];
		let bagrounad_img:any;
		let ball_img:any;
		let player_left_img:any;
		let player_right_img:any;

		const setup = (p5: p5Types, canvasParentRef: Element) => {
			p5.createCanvas(props.width, props.height).parent(
			  canvasParentRef,
			);
			bagrounad_img = p5.loadImage(_baground_img);
			ball_img = p5.loadImage(_ball_img);
			player_left_img = p5.loadImage(_player_left_img);
			player_right_img = p5.loadImage(_player_right_img);
		};

		const draw = (p5: p5Types) => {
			p5.image(bagrounad_img, 0, 0, props.width, props.height);
			p5.image(player_left_img, new_game.player_left.x, new_game.player_left.y
				, new_game.player_left.width, new_game.player_left.height);
			p5.image(player_right_img, new_game.player_right.x, new_game.player_right.y
					, new_game.player_right.width, new_game.player_right.height);
			p5.fill(51, 102, 255);
			for (let i = 0; i <= props.height ; i += props.height * 0.08)
				p5.rect(props.width * 0.49 , i, props.width * 0.01, props.height * 0.04);
			p5.image(ball_img, new_game._ball.x - new_game._ball.radius ,
				new_game._ball.y - new_game._ball.radius,
				new_game._ball.radius * 2, new_game._ball.radius * 2);
			p5.textSize(32);
			p5.fill(230, 236, 255);
			p5.text(new_game.player_left.score.toString(), props.width / 4, props.height / 6);
			p5.text(new_game.player_right.score.toString(), props.width * 3 / 4, props.height / 6);
			if (new_game.player_left.score < 5 && new_game.player_right.score < 5)
					new_game.update();
		}
		histoy_game.push(new_game.update());
	return (
		<div className='game'>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
}