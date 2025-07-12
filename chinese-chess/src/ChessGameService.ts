import { ChessGame } from './models/ChessGame';
import { Position } from './models/Position';
import { MoveResult } from './models/MoveResult';

export class ChessGameService {
  private games: Map<string, ChessGame> = new Map();

  createGame(gameId: string): ChessGame {
    const game = new ChessGame();
    this.games.set(gameId, game);
    return game;
  }

  getGame(gameId: string): ChessGame | undefined {
    return this.games.get(gameId);
  }

  makeMove(gameId: string, from: Position, to: Position): MoveResult {
    const game = this.games.get(gameId);
    if (!game) {
      return {
        isLegal: false,
        gameOver: false,
        winner: undefined,
        reason: 'Game not found'
      };
    }
    return game.makeMove(from, to);
  }
}