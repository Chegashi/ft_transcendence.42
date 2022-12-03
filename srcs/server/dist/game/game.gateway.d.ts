import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
export declare class GameGateway {
    private readonly gameService;
    constructor(gameService: GameService);
    createGame(createGameDto: CreateGameDto): string;
}
