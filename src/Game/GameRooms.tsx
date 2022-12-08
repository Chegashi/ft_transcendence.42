import socketService from "./socketService";
import gameService from "./gameService";
import { useState } from "react";

export type IroomsPong = {
  gameId : number,
  playerLeft: {
    name: string;
    score: number;
  };
  playerRight: {
    name: string;
    score: number;
  };
};

export default function GameRooms(props: any) {
  const [rooms, setRooms] = useState<any>([]);
  if (socketService.socket) {
    gameService.findAllGame(socketService.socket,
      (res: any) => {
      setRooms(res);
    });
  }

  return (
    <>
      <h1>Game Rooms</h1>
      {rooms.forEach((room: any) => {
        <div className="room__name" onClick={(props.roomId = room.idRoom)}>
          {room.player_1} VS {room.player_2}
        </div>;
      })}
    </>
  );
}
