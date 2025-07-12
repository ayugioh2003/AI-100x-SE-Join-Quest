import { ChessBoard } from './ChessBoard';
import { Position } from './Position';
import { Color, GameState } from './enums';
import { MoveResult } from './MoveResult';
import { Move } from './Move';

export class ChessGame {
  private board: ChessBoard;
  private currentPlayer: Color = Color.RED;
  private gameState: GameState = GameState.IN_PROGRESS;
  private moveHistory: Move[] = [];

  constructor() {
    this.board = new ChessBoard();
  }

  makeMove(from: Position, to: Position): MoveResult {
    // Stub implementation - will be implemented during BDD process
    return {
      isLegal: false,
      gameOver: false,
      reason: 'Not implemented'
    };
  }

  isGameOver(): boolean {
    return this.gameState === GameState.CHECKMATE || 
           this.gameState === GameState.STALEMATE || 
           this.gameState === GameState.DRAW;
  }

  getWinner(): Color | undefined {
    if (this.gameState === GameState.CHECKMATE) {
      return this.currentPlayer === Color.RED ? Color.BLACK : Color.RED;
    }
    return undefined;
  }

  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === Color.RED ? Color.BLACK : Color.RED;
  }
}