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
    
    if (!isValidMove) {
      return {
        isLegal: false,
        gameOver: false,
        reason: 'Invalid move'
      };
    }

    // Check what piece we're capturing
    const capturedPiece = this.board.getPieceAt(to);
    
    // Execute the move
    this.board.movePiece(from, to);
    piece.position = to;
    
    // Check if we captured the opponent's general (immediate win)
    let gameOver = false;
    let winner = undefined;
    
    if (capturedPiece && capturedPiece.type === 'GENERAL') {
      gameOver = true;
      winner = this.currentPlayer;
      this.gameState = GameState.CHECKMATE;
    } else {
      // Switch player turn only if game continues
      this.switchPlayer();
    }
    
    return {
      isLegal: true,
      gameOver,
      winner,
      reason: undefined
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