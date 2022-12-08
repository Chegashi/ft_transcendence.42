import p5Types from "p5";
import Sketch from "react-p5";
import { useState, useEffect } from 'react';
import p5 from "p5";
import pong from "./Pong";
import "./game.css";
// import socketService from "./socketService";
// import gameService from "./gameService";
import io from 'socket.io-client';
// import { io } from "socket.io-client";



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

export interface IGameContextProps {
  pongClass: any;
  numberOfPlayers: number;
  playerTool: string;
  difficulty: string;
  mode: string;
  startGame: boolean;
  endGame: boolean;
  buttons: {
    online?: any;
    offline?: any;
    oneplayer?: any;
    twoplayer?: any;
    mouse?: any;
    keybord?: any;
    easy?: any;
    medium?: any;
    hard?: any;
  };
  sound: {
    hit: any;
    wall: any;
    left: any;
    right: any;
  };
  GameLoaded: boolean;
  pongData: IplayPong;
  radius: number;
  socket:any;

  setNumberOfPlayers: (
    ctx: p5.Renderer,
    width: number,
    height: number,
    buttons: any
  ) => void;
  setPlayerTool: (
    ctx: p5.Renderer,
    width: number,
    height: number,
    buttons: any
  ) => void;
  setDifficulty: (
    ctx: p5.Renderer,
    width: number,
    height: number,
    buttons: any
  ) => void;
  setMode: (
    ctx: p5.Renderer,
    width: number,
    height: number,
    buttons: any
  ) => void;
  setPongData: (pongData: IplayPong) => void;
}

const buttonsStyle = (width: number, height: number, button: any,
  x: number, y: number) => {
  let margin = `${width * 0.25}`.toString() + "px";
  button.show();
  button.style("left, " + margin);
  button.style("right, " + margin);
  button.style("width", `${width * 0.5}`.toString() + "px");
  button.position(x, y);
  button.style("height", `${height * 0.1}`.toString() + "px");
  button.mouseOver(() => {
    // button.style('background-color', '#f2f2f2');
  });
};

const buttonRemove = (button: any) => {
  button.hide();
  button.remove(button);
};

const defaultState: IGameContextProps = {
  pongClass: null,
  numberOfPlayers: 0,
  playerTool: "",
  difficulty: "",
  mode: "",
  startGame: false,
  endGame: false,
  buttons: {
    online: null,
    offline: null,
    oneplayer: null,
    twoplayer: null,
    mouse: null,
    keybord: null,
    easy: null,
    medium: null,
    hard: null,
  },
  sound: {
    hit: null,
    wall: null,
    left: null,
    right: null,
  },
  GameLoaded: false,
  pongData: {
    playerLeft: {
      name: "",
      position: 0.375,
      score: 0,
    },
    playerRight: {
      name: "",
      position: 0.375,
      score: 0,
    },
    ball: {
      x: 0.5,
      y: 0.5,
    },
    isGameStarted: false,
    musicIndice: "",
    userRool: "",
  },
  radius: 0,
  socket: null,

  setMode: (ctx: p5.Renderer, width: number, height: number, buttons: any) => {
    buttonsStyle(
      width,
      height,
      buttons.online,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.38
    );
    buttonsStyle(
      width,
      height,
      buttons.offline,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.52
    );
    buttons.online.mousePressed(() => {
      defaultState.mode = "online";
      defaultState.numberOfPlayers = 2;
      buttonRemove(buttons.online);
      buttonRemove(buttons.offline);
    });
    buttons.offline.mousePressed(() => {
      defaultState.mode = "offline";
      buttonRemove(buttons.offline);
      buttonRemove(buttons.online);
    });
  },

  setNumberOfPlayers: (
    ctx: p5.Renderer,
    width: number,
    height: number,
    buttons: any
  ) => {
    buttonsStyle(
      width,
      height,
      buttons.oneplayer,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.38
    );
    buttonsStyle(
      width,
      height,
      buttons.twoplayer,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.52
    );
    buttons.oneplayer.mousePressed(() => {
      defaultState.numberOfPlayers = 1;
      buttonRemove(buttons.oneplayer);
      buttonRemove(buttons.twoplayer);
    });
    buttons.twoplayer.mousePressed(() => {
      defaultState.numberOfPlayers = 2;
      buttonRemove(buttons.oneplayer);
      buttonRemove(buttons.twoplayer);
    });
  },

  setPlayerTool: (
    ctx: p5.Renderer,
    width: number,
    height: number,
    buttons: any
  ) => {
    buttonsStyle(
      width,
      height,
      buttons.mouse,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.38
    );
    buttonsStyle(
      width,
      height,
      buttons.keybord,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.52
    );
    buttons.mouse.mousePressed(() => {
      defaultState.playerTool = "mouse";
      buttonRemove(buttons.mouse);
      buttonRemove(buttons.keybord);
    });
    buttons.keybord.mousePressed(() => {
      defaultState.playerTool = "keybord";
      buttonRemove(buttons.mouse);
      buttonRemove(buttons.keybord);
    });
  },

  setDifficulty: (
    ctx: p5.Renderer,
    width: number,
    height: number,
    buttons: any
  ) => {
    buttonsStyle(
      width,
      height,
      buttons.easy,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.31
    );
    buttonsStyle(
      width,
      height,
      buttons.medium,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.45
    );
    buttonsStyle(
      width,
      height,
      buttons.hard,
      ctx.position().x + width * 0.25,
      ctx.position().y + height * 0.59
    );
    buttons.easy.mousePressed(() => {
      defaultState.difficulty = "easy";
      buttonRemove(buttons.easy);
      buttonRemove(buttons.medium);
      buttonRemove(buttons.hard);
    });
    buttons.medium.mousePressed(() => {
      defaultState.difficulty = "medium";
      buttonRemove(buttons.easy);
      buttonRemove(buttons.medium);
      buttonRemove(buttons.hard);
    });
    buttons.hard.mousePressed(() => {
      defaultState.difficulty = "hard";
      buttonRemove(buttons.easy);
      buttonRemove(buttons.medium);
      buttonRemove(buttons.hard);
    });
  },
  setPongData: (pongData: IplayPong) => {
    defaultState.pongData = pongData;
  },
};

export default function Game(props: any) {

  // useEffect(() => {

  //   return () => {
  //     alert('warning');
  //   }

  // }, [])

  const [gameState, setGameState] = useState(defaultState);
  let ctx: any;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    ctx = p5.createCanvas(props.width, props.height).parent(canvasParentRef);

    gameState.buttons.online = p5.createButton("Online");
    gameState.buttons.online.hide();
    gameState.buttons.online.addClass("mode");

    gameState.buttons.offline = p5.createButton("Offline");
    gameState.buttons.offline.hide();
    gameState.buttons.offline.addClass("mode");

    gameState.buttons.oneplayer = p5.createButton("ONE PLAYER");
    gameState.buttons.oneplayer.hide();
    gameState.buttons.oneplayer.addClass("numberOfPlayers");

    gameState.buttons.twoplayer = p5.createButton("TWO PLAYERS");
    gameState.buttons.twoplayer.hide();
    gameState.buttons.twoplayer.addClass("numberOfPlayers");

    gameState.buttons.mouse = p5.createButton("MOUSE");
    gameState.buttons.mouse.hide();
    gameState.buttons.mouse.addClass("toolsPlayer");

    gameState.buttons.keybord = p5.createButton("KEYBORD");
    gameState.buttons.keybord.hide();
    gameState.buttons.keybord.addClass("toolsPlayer");

    gameState.buttons.easy = p5.createButton("EASY");
    gameState.buttons.easy.hide();
    gameState.buttons.easy.addClass("difficulty");

    gameState.buttons.medium = p5.createButton("MEDIUM");
    gameState.buttons.medium.hide();
    gameState.buttons.medium.addClass("difficulty");

    gameState.buttons.hard = p5.createButton("HARD");
    gameState.buttons.hard.hide();
    gameState.buttons.hard.addClass("difficulty");

    gameState.sound.hit = new Audio(require("./assets/hit.mp3"));
    gameState.sound.wall = new Audio(require("./assets/wall.mp3"));
    gameState.sound.left = new Audio(require("./assets/left.mp3"));
    gameState.sound.right = new Audio(require("./assets/right.mp3"));
    // if (socketService.socket)
    // {
    //   console.log("set", gameState.socket);
    //   gameService.createGame(gameState.socket, "user");
    // }
    // else
    // console.log("setfal", socketService.socket)
      gameState.socket = io('http://localhost:4000')
      console.log("setfal", gameState.socket)
    // // p5.frameRate(30);
  };

  const draw = (p5: p5Types) => {
    p5.fill("black");
    p5.rect(0, 0, props.width, props.height);
    if (!gameState.GameLoaded) {
      if (
        gameState.mode === "offline" && gameState.difficulty === "" &&
        gameState.numberOfPlayers === 1 && gameState.playerTool !== "") {
        gameState.setDifficulty(ctx, props.width, props.height,
          gameState.buttons);
      } else if ((gameState.mode === "online" || gameState.numberOfPlayers === 1)
        && gameState.playerTool === "") {
        gameState.setPlayerTool(ctx, props.width, props.height,
          gameState.buttons);
      } else if (gameState.mode !== "" && gameState.numberOfPlayers === 0) {
        gameState.setNumberOfPlayers(ctx, props.width, props.height,
          gameState.buttons);
      } else if (gameState.mode === "") {
        gameState.setMode(ctx, props.width, props.height, gameState.buttons);
      } else {
        defaultState.GameLoaded = true;
      }
    } else {
      if (!gameState.pongData.isGameStarted) {
        if (gameState.mode === "online") {
          if (gameState.socket) {
            console.log(props, 'ALL PROPS');
            
            gameState.socket.emit('createGame', 'props');
          } else console.log("socketService.socket is null");
        } else if (
          gameState.mode === "offline" && gameState.numberOfPlayers === 1) {
          gameState.pongClass = new pong("user", "IA");
        } else if (gameState.mode === "offline" &&
          gameState.numberOfPlayers === 2) {
          gameState.pongClass = new pong("mouse", "keybord");
        }
        gameState.pongData.isGameStarted = true;
        gameState.radius =
          Math.sqrt(props.width * props.width + props.height * props.height) *
          0.028;
      } else {
        if (gameState.mode === "online") {
          // if (gameState.socket)
          gameState.socket.emit('updateGame',
              gameState.pongData.playerLeft.position, (pongData:any) => {
                gameState.pongData = pongData;
                // setPongData(pongData);
              }
            );
        } else if (
          gameState.mode === "offline" && gameState.numberOfPlayers === 1) {
          if (gameState.playerTool === "mouse" && p5.mouseY > 0 &&
            p5.mouseY < props.height - props.height / 4) {
            gameState.pongData.playerLeft.position = p5.mouseY / props.height;
          } else if (gameState.playerTool === "keybord") {
            if (p5.keyIsDown(p5.UP_ARROW) &&
              gameState.pongData.playerLeft.position > 0) {
              gameState.pongData.playerLeft.position -= 0.03;
            }
            if (p5.keyIsDown(p5.DOWN_ARROW) &&
              gameState.pongData.playerLeft.position < 0.75) {
              gameState.pongData.playerLeft.position += 0.03;
            }
          }
          gameState.pongData = gameState.pongClass.update(
            gameState.pongData.playerLeft.position
          );
        } else if (gameState.mode === "offline" &&
          gameState.numberOfPlayers === 2
        ) {
          if (p5.mouseY > 0 && p5.mouseY < props.height - props.height / 4) {
            gameState.pongData.playerLeft.position = p5.mouseY / props.height;
          }
          if (
            p5.keyIsDown(p5.UP_ARROW) &&
            gameState.pongData.playerRight.position > 0
          ) {
            gameState.pongData.playerRight.position -= 0.03;
          }
          if (
            p5.keyIsDown(p5.DOWN_ARROW) &&
            gameState.pongData.playerRight.position < 0.75
          ) {
            gameState.pongData.playerRight.position += 0.03;
          }
          gameState.pongData = gameState.pongClass.update(
            gameState.pongData.playerLeft.position,
            gameState.pongData.playerRight.position
          );
        }
        p5.fill(77, 166, 255);
        p5.textSize(props.width / 15);
        p5.text(
          gameState.pongData.playerLeft.score,
          props.width / 4,
          props.height / 8
        );
        p5.text(
          gameState.pongData.playerRight.score,
          (props.width * 3) / 4,
          props.height / 8
        );
        p5.textSize(props.width / 20);
        p5.text(
          gameState.pongData.playerLeft.name,
          (props.width * 3) / 16,
          (props.height * 2) / 8
        );
        p5.text(
          gameState.pongData.playerRight.name,
          (props.width * 11) / 16,
          (props.height * 2) / 8
        );
        for (let i = 0; i <= 10; i++) {
          p5.rect(
            props.width * 0.49,
            (i * props.height) / 8,
            props.width * 0.02,
            props.height / 20
          );
        }
        p5.fill(179, 240, 255);
        p5.circle(
          gameState.pongData.ball.x * props.width,
          gameState.pongData.ball.y * props.height,
          gameState.radius
        );
        p5.fill(102, 181, 255);
        p5.rect(
          0,
          gameState.pongData.playerLeft.position * props.height,
          props.width / 60,
          props.height / 4
        );

        p5.fill(77, 77, 255);
        p5.rect(
          props.width - props.width / 60,
          gameState.pongData.playerRight.position * props.height,
          props.width / 60,
          props.height / 4
        );
        if (!gameState.pongData.isGameStarted) {
          p5.noLoop();
        }
        if (gameState.pongData.musicIndice === "hit") {
          gameState.sound.hit.play();
        }
        if (gameState.pongData.musicIndice === "left") {
          gameState.sound.left.play();
        }
        if (gameState.pongData.musicIndice === "right") {
          gameState.sound.right.play();
        }
        if (gameState.pongData.musicIndice === "wall") {
          gameState.sound.wall.play();
        }
      }
    }
  };
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}