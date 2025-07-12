import { ChessBoard } from './ChessBoard';
import { Position } from './Position';
import { Color, GameState } from './enums';
import { MoveResult } from './MoveResult';
import { Move } from './Move';

export class ChessGame {
  private board: ChessBoard;
  private currentPlayer: Color = Color.RED;
  private gameState: GameState = GameState.IN_PROGRESS;
  private moveHistory: Move[] = []; // TODO: will be used for move history tracking

  constructor() {
    this.board = new ChessBoard();
  }

  makeMove(from: Position, to: Position): MoveResult {
    const piece = this.board.getPieceAt(from);
    if (!piece) {
      return {
        isLegal: false,
        gameOver: false,
        reason: 'No piece at source position'
      };
    }

    if (piece.color !== this.currentPlayer) {
      return {
        isLegal: false,
        gameOver: false,
        reason: 'Not your piece'
      };
    }

    const isValidMove = piece.isValidMove(this.board, from, to);
    
    return {
      isLegal: isValidMove,
      gameOver: false,
      reason: isValidMove ? undefined : 'Invalid move'
    };
  }

  getBoard(): ChessBoard {
    return this.board;
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