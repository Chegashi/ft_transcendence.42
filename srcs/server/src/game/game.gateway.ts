import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@WebSocketGateway()
export class GameGateway {
  constructor(private readonly gameService: GameService) { }

  @SubscribeMessage('createGame')
  createGame(@MessageBody() createGameDto: CreateGameDto) {
    console.log(createGameDto);
    return this.gameService.createGame(createGameDto);
  }
}
