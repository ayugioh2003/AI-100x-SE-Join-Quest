import { ChessBoard } from './ChessBoard';
import { Position } from './Position';
import { Color, GameState, PieceType } from './enums';
import type { MoveResult } from './MoveResult';
import { Move } from './Move';

export class ChessGame {
  private board: ChessBoard;
  private currentPlayer: Color = Color.RED;
  private gameState: GameState = GameState.IN_PROGRESS;
  private winner: Color | undefined = undefined;
  private moveHistory: Move[] = []; // TODO: will be used for move history tracking

  constructor() {
    this.board = new ChessBoard();
  }

  makeMove(from: Position, to: Position): MoveResult {
    const piece = this.board.getPieceAt(from);
    if (!piece) {
      return {
        isLegal: false,
        success: false,
        gameOver: false,
        reason: 'No piece at source position',
        captured: false
      };
    }

    if (piece.color !== this.currentPlayer) {
      return {
        isLegal: false,
        success: false,
        gameOver: false,
        reason: 'Not your piece',
        captured: false
      };
    }

    const isValidMove = piece.isValidMove(this.board, from, to);
    
    if (!isValidMove) {
      return {
        isLegal: false,
        success: false,
        gameOver: false,
        reason: 'Invalid move',
        captured: false
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
    
    if (capturedPiece && capturedPiece.type === PieceType.GENERAL) {
      gameOver = true;
      winner = this.currentPlayer;
      this.winner = this.currentPlayer;
      this.gameState = GameState.CHECKMATE;
    } else {
      // Switch player turn only if game continues
      this.switchPlayer();
    }
    
    return {
      isLegal: true,
      success: true,
      gameOver,
      winner,
      reason: undefined,
      captured: capturedPiece !== null
    };
  }

  getBoard(): ChessBoard {
    return this.board;
  }

  getCurrentPlayer(): Color {
    return this.currentPlayer;
  }

  isGameOver(): boolean {
    return this.gameState === GameState.CHECKMATE || 
           this.gameState === GameState.STALEMATE || 
           this.gameState === GameState.DRAW;
  }

  getWinner(): Color | undefined {
    return this.winner;
  }

  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === Color.RED ? Color.BLACK : Color.RED;
  }
}