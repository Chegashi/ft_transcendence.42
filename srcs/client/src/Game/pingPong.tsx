// import React from 'react';
import { useState } from 'react'
import Game from "../components/Game";
import GameRooms from "../components/GameRooms";
// import { io } from "socket.io-client";
import socketService from "./socketService";
import { useEffect } from 'react';
import PingPongTrain from './pingPongTrain';

export default function PingPong() {
  const [isInRoom, setInRoom] = useState(false);
  const [roomId, setroomId] = useState(0);
  const [train, setIsTrain] = useState(false);

  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:4000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <div className="App">
      {!isInRoom && <GameRooms roo/>}
      {!isInRoom &&
        <div className="choices">
          <button
            onClick={() => {
              setInRoom(true);
              setroomId(0);
            }}>Play Pong
          </button>
          <button
            onClick={() => {
              setIsTrain(true)
            }
            }>Play Train
          </button>
        </div>
      }
      {isInRoom && <Game idPlayer={(Math.random() + 1).toString(36).substring(7)}
        width={600} height={400} idRoom={roomId} />}
      {train && <PingPongTrain />}
    </div >
  );
}
