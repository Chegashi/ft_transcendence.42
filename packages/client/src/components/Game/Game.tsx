// import { networkInterfaces } from 'os';
import React, { useRef, useEffect } from 'react';
import pong from './Pong'

interface Props {
	width: string;
	height: string;
}

function update_data(_data:any, width:number, height:number):object{
	return {
		player_left: {y:(_data.player_left.y * height), score:_data.player_left.score},
		player_right: {y:(_data.player_right.y * height), score:_data.player_right.score},
		ball: {x:(_data.ball.x * width), y:(_data.ball.y * height)},
		music_id:_data.music_id, still_playing:_data.still_playing
	};
}

const Game: React.FC<Props> = (props:any) => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
	let new_game = new pong();
	let data:Object;
	data = new_game.data_to_render();
	data = update_data(data, props.width, props.height);

  useEffect(() => {
    if (canvasRef.current) {
    canvasCtxRef.current = canvasRef.current.getContext('2d');
    let ctx = canvasCtxRef.current;
    const interval = setInterval(() => {
      new_game.update();
			data = update_data(new_game.data_to_render(), props.width, props.height);
      render(ctx, data, props.width, props.height);
    }, 20);
    return () => clearInterval(interval);
	}
  }, []);
  return (<canvas ref={canvasRef} width={props.width} height={props.height} ></canvas>);
};

function drawRect(ctx: any, x: number, y: number, w: number, h: number, color: any){
  ctx!.fillStyle = color;
  ctx!.fillRect(x, y, w, h);
}

function drawText(ctx: any, text: any, x: number, y: number, color: any){
    ctx!.fillStyle = color;
    ctx!.font = "75px fantasy";
    ctx!.fillText(text, x, y);
}

function render(ctx: any, data: any, width: number, height: number){
	drawRect(ctx, 0, 0, ctx!.canvas.width, ctx!.canvas.height, "black");
	drawRect(ctx, 0, data.player_left.y, width / 60, height / 4, "white");
	drawRect(ctx, width - width / 60, data.player_right.y, width / 60, height / 4, "white");
	for (let i = 0; i <= height ; i += height / 27)
		drawRect(ctx, width * 0.48, i, width * 0.04, height * 0.025, "white");
	drawRect(ctx, data.ball.x - width / 60, data.ball.y - height / 60, width / 30, width / 30, "white");
	drawText(ctx, data.player_left.score.toString(), width / 4, height / 6, "white");
	drawText(ctx, data.player_right.score.toString(), width * 3 / 4, height / 6, "white");
}

export default Game;