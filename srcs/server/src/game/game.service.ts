import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  createGame(createGameDto: CreateGameDto) {
    console.log('createGame222', createGameDto);
    return 'This action adds a new game';
  }
}
