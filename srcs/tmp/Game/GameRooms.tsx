import socketService from "./socketService";
import gameService from "./gameService";
import { useState } from "react";

export default function GameRooms(props: any) {
  const [rooms, setRooms] = useState<any>([]);
  if (socketService.socket) {
    gameService.getRooms(socketService.socket).then((res: any) => {
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