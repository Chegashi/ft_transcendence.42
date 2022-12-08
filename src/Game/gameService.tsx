import { Socket } from "socket.io-client";
import { IplayPong } from "./Game";
import IroomsPong from "./GameRooms";

class GameService {
  public async createGame(socket: Socket, userName: string)
    : Promise<boolean> {
    return new Promise((rs, rj) => {
      console.log("createGame", userName);
      socket.on("createGame", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));
    });
  }

  public async findAllGame(socket: Socket,
    listiner: (roomsData: typeof IroomsPong) => void
  ) {
    socket.on("findAllGame", ({ roomsData }) => listiner(roomsData));
  }

  public async findOneGame(
    socket: Socket,
  ) {
    socket.emit("findOneGame");
  }

  public async onGameUpdate(
    socket: Socket,
    position: number,
    listiner: (pongData: IplayPong) => void
  ) {
    socket.on("on_game_update", ({ pongData }) => listiner(pongData));
  }
}

export default new GameService();
