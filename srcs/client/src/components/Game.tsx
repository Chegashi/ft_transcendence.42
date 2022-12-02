import p5Types from 'p5';
import Sketch from 'react-p5';
import { useState } from 'react';
import socketService from "../Game/socketService";
import gameService from "../Game/gameService";



export type IplayPong = {
    playerLeft: {
        name: string;
        position: number;
        score: number;
    };
    playerRight: {
        name: string;
        position: number;
        score: number;
    };
    ball: {
        x: number;
        y: number;
    };
    isGameStarted: boolean;
    musicIndice: string;
    userRool: string;
};

export default function Game(props: any) {
    const [pongData, setPongData] = useState<IplayPong>({
        playerLeft: {
            name: "playerLeft",
            position: 0.5,
            score: 0
        },
        playerRight: {
            name: "playerRight",
            position: 0.5,
            score: 0
        },
        ball: {
            x: 0.5,
            y: 0.5
        },
        isGameStarted: false,
        musicIndice: "",
        userRool: ""
    });
    const width = props.width;
    const height = props.height;
    const radius = Math.sqrt(width * width + height * height) * 0.028;
    const padle_height = height / 4;
    const padle_width = width / 60;
    let ctx: any = null;
    let playerPosition: number = 0.5;

    let start: boolean = false;
    let btn_start: any = null;
    let tool: any = null;
    let muteSound: any = null;

    const hit__ = require('./assets/sounds_hit.mp3');
    const win__ = require('./assets/win.mp3');
    const lose__ = require('./assets/lose.mp3');
    const wall = require('./assets/wall.mp3');
    const hit = new Audio(hit__);
    const win = new Audio(win__);
    const lose = new Audio(lose__);
    const wall_sound = new Audio(wall);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        ctx = p5.createCanvas(width, height).parent(canvasParentRef);
        btn_start = p5.createButton('Start');
        btn_start.mousePressed(start_func);
        btn_start.size(width / 3, height / 3);
        btn_start.style("font-family", "Bodoni");
        btn_start.style("font-size", width / 20 + "px");
        btn_start.style("background-color", "gray");
        tool = p5.createRadio();
        tool.option('mouse');
        tool.option('keyboard');
        tool.style("font-family", "Bodoni");
        tool.style("font-size", width / 20 + "px");
        muteSound = p5.createCheckbox('mute sound', false);
        muteSound.style("font-family", "Bodoni");
        muteSound.style("font-size", width / 20 + "px");
        muteSound.changed(muteSound_func);
        p5.frameRate(60);
        console.log("setup", pongData);
    }

    let start_func = () => {
        if (tool.value() === "") {
            alert("Please choose a tool");
            return;
        }
        else
            start = true;
        btn_start.hide();
        btn_start.remove();
        tool.hide();
        tool.remove();
        muteSound.hide();
        muteSound.remove();
        console.log("s", tool.value());
    }

    const muteSound_func = () => {
        if (muteSound.checked()) {
            hit.volume = 0;
            win.volume = 0;
            lose.volume = 0;
            wall_sound.volume = 0;
        }
    }

    const draw = (p5: p5Types) => {
        console.log("draw");
        if (start === false) {
            p5.background("slategray");
            p5.textSize(width / 30);
            btn_start.position(ctx.position().x + width / 3, ctx.position().y + height / 3);
            muteSound.position(ctx.position().x + width * 0.7, ctx.position().y + height * 0.8);
            tool.position(ctx.position().x, ctx.position().y + height * 0.8);
        }
        else {
            if (socketService.socket)
                gameService.onGameUpdate(socketService.socket, (pongData) => {
                    setPongData(pongData);
                });
            p5.fill(77, 166, 255);
            p5.textSize(width / 15);
            p5.text(pongData.playerLeft.score, width / 4, height / 8);
            p5.text(pongData.playerRight.score, width * 3 / 4, height / 8);
            p5.textSize(width / 20);
            p5.text(pongData.playerLeft.name, width * 3 / 16, height * 2 / 8);
            p5.text(pongData.playerRight.name, width * 11 / 16, height * 2 / 8);
            for (let i = 0; i <= 10; i++) {
                p5.rect(width * 0.49, i * height / 8, width * 0.02, height / 20);
            }

            p5.fill(179, 240, 255);
            p5.circle(pongData.ball.x * width, pongData.ball.y * height, radius);

            if (pongData.userRool !== "watcher" && tool.value() === "keyboard" && p5.keyIsDown(p5.UP_ARROW) && pongData.playerLeft.position > 0 && socketService.socket
            ) {
                playerPosition -= 10;
                gameService.updateGame(socketService.socket, pongData.playerLeft.position);

            }
            if (p5.keyIsDown(p5.DOWN_ARROW) && pongData.playerLeft.position < height - padle_height
                && socketService.socket && tool.value() === "keyboard") {
                // player_right_y += 10;
                gameService.updateGame(socketService.socket, pongData.playerLeft.position);

            }

            if (p5.mouseY > 0 && p5.mouseY < height - padle_height && socketService.socket
                && tool.value() === "mouse") {
                // player_left_y = p5.mouseY;
                gameService.updateGame(socketService.socket, pongData.playerLeft.position);

            }
            p5.fill(102, 181, 255);
            p5.rect(0, pongData.playerLeft.position * height, padle_width, padle_height);

            p5.fill(77, 77, 255);
            p5.rect(width - padle_width, pongData.playerRight.position * height, padle_width, padle_height);
            console.log("draw", pongData);
            if (pongData.isGameStarted === false) {
                p5.noLoop();
            }
            if (pongData.musicIndice === "hit") {
                hit.play();
            }
            if (pongData.musicIndice === "mochegri") {
                win.play();
            }
            if (pongData.musicIndice === "ia") {
                lose.play();
            }
            if (pongData.musicIndice === "wall") {
                wall_sound.play();
            }
        }
    }
    return (
        <div className="App">
            <h1 className="App-header">Pong</h1>
            <Sketch setup={setup} draw={draw} />
        </div>
    )
}
