import { Socket } from "socket.io-client";
import { IplayPong } from "../components/Game";
// import GameRooms from '../components/GameRooms';

class GameService {
  public async getRooms(socket: Socket) {
    return new Promise((resolve, reject) => {
      socket.emit("getRooms", (res: any) => {
        resolve(res);
      });
    });
  }

  public async joinGameRoom(socket: Socket, userName: string, is_player:boolean): Promise<boolean> {
    return new Promise((rs, rj) => {
      console.log("joinGameRoom", userName, is_player);
      console.log({ userName, is_player});
      socket.emit("createGame", { userName, is_player});
      socket.on("room_joined", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));
    });
  }

  public async updateGame(socket: Socket, position: number) {
    socket.emit("update_game", position );
  }

  public async onGameUpdate(
    socket: Socket,
    listiner: (pongData: IplayPong) => void
  ) {
    socket.on("on_game_update", ({ pongData }) => listiner(pongData));
  }

  public async GameRooms(
    socket: Socket,
    listener: (GameRooms: any) => void
  ) {
    socket.on("GameRooms", ({ GameRooms }) => listener(GameRooms));
  }

}

export default new GameService();
