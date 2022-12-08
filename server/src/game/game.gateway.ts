import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Server, Socket } from 'socket.io';
// import { Socket } from 'socket.io';
// import { UpdateGameDto } from './dto/update-game.dto';
import Pong from './Pong';

@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gameService: GameService) {}
  @WebSocketServer() wss: Server;
  @WebSocketServer() pongMap: Map<string, Pong> = new Map();
  @WebSocketServer() gamequeue = [];

  handleConnection(client: any) {
    client.gid = 44;
    console.log('CONNECTED', client.id);
  }

  handleDisconnect(client: Socket) {
    // client.handshake.headers.cookie
    console.log('DISCONNECTED', client.id);
  }

  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: any) {
    console.log(createGameDto, 2);
    this.gamequeue.push(createGameDto);
    if (this.gamequeue.length === 2) {
      const game = this.gamequeue.splice(0, 2);
      this.wss.to(game[0].id).emit('gameFound', game[1]);
      this.wss.to(game[1].id).emit('gameFound', game[0]);
      this.pongMap.set(game[0].id, new Pong(game[0].id, game[1].id));
    }
    return this.gameService.create(createGameDto);
  }

  @SubscribeMessage('findAllGame')
  findAll() {
    const rooms = [];
    this.pongMap.forEach((pong, id) => {
      rooms.push([id, pong.player_left, pong.player_right]);
    });
    return rooms;
  }

  @SubscribeMessage('findOneGame')
  findOne(@MessageBody() createGameDto: any, @MessageBody() id: number) {
    this.pongMap[id].spectateurs.push(createGameDto.id);
    return this.gameService.findOne(id);
  }

  @SubscribeMessage('updateGame')
  update(@MessageBody() updateGameDto: any) {
    console.log(updateGameDto, 3);
    const pong = this.pongMap.get(updateGameDto.id);
    if (pong) {
      return pong.updateGame();
    }
    return this.gameService.update(updateGameDto.id, updateGameDto);
  }

  @SubscribeMessage('onGameUpdate')
  remove(@MessageBody() createGameDto: any, gameId: any, position: number) {
    const pong = this.pongMap.get(gameId);
    if (pong) {
      if (createGameDto.id === pong.player_left.id)
        pong.player_left.y = position;
      else if (createGameDto.id === pong.player_right.id)
        pong.player_right.y = position;
    }
    return this.gameService.remove(gameId);
  }
}
