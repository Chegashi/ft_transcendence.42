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

let width = 600;
let height = 400;


export default class pong{
	player_left:player;
	player_right:player;
	how_play:player;
	ball:ball;

	constructor(){
		this.player_left = {x:0, y:(height - 100) / 2, width:10, height:100, score:0};
		this.player_right = {x:width - 10, y:(height - 100) / 2, width:10, height:100, score:0};
		this.ball = {x:(width / 2), y:(height / 2), radius:10,speed:7, velocity_X:5, velocity_Y:5};
		this.how_play = this.player_right;
	}

	reset = () => {
		this.ball.x = width / 2;
		this.ball.y = height / 2;
		this.ball.velocity_X *= -1;
		this.ball.speed = 7;
	}

	collision = (ball:ball, player:player):boolean => {
		let p_top = this.how_play.y;
		let p_bottom = this.how_play.y + this.how_play.height;
		let p_left = this.how_play.x;
		let p_right = this.how_play.x + this.how_play.width;
	
		let b_top = this.ball.y - this.ball.radius;
		let b_bottom = this.ball.y + this.ball.radius;
		let b_left = this.ball.x - this.ball.radius;
		let b_right = this.ball.x + this.ball.radius;
		return(p_left < b_right && p_top < b_bottom && p_right > b_left
			&& p_bottom > b_top);
	}

	set_player = (y:number) =>{
		if (y > 0 && y * height < 300)
			this.player_left.y = y * height;
	}

	update = ():any => {
		if (this.ball.x - this.ball.radius  < 0){
			this.reset();
			this.player_right.score++;
		}
		else if (this.ball.x + this.ball.radius > width){
			this.reset();
			this.player_left.score++;
		}
		this.ball.x += this.ball.velocity_X;
		this.ball.y += this.ball.velocity_Y;
		this.player_right.y += ((this.ball.y - (this.player_right.y
								+ this.player_right.height / 2))) * 0.1;
		if (this.ball.y - this.ball.radius < 0 ||
			this.ball.y + this.ball.radius > height){
				this.ball.velocity_Y *= -1;
		}
		let how_play = (this.ball.x  + this.ball.radius < width / 2) ? this.player_left : this.player_right;

		if (this.collision(this.ball, how_play)){
			let collide_point = (this.ball.y
				- (this.how_play.y + this.how_play.height / 2));
			collide_point /= how_play.height / 2;
			let angleRad = (Math.PI / 4) * collide_point;
			let direction = (this.ball.x  + this.ball.radius < width / 2) ? 1 : -1;
			this.ball.velocity_X = direction * this.ball.speed * Math.cos(angleRad);
			this.ball.velocity_Y = this.ball.speed * Math.sin(angleRad);
			this.ball.speed += 0.1;
		}
		return {
			player_left: {
				x:this.player_left.x / width,
				y:this.player_left.y / height,
				score:this.player_left.score
			},
			player_right: {
				x:this.player_right.x / width,
				y:this.player_right.y / height,
				score:this.player_right.score
			},
			ball: {
				x:(this.ball.x / width),
				y:(this.ball.y / height)
			},
			still_playing:(this.player_left.score < 5 && this.player_right.score < 5)
		};
	}
}
