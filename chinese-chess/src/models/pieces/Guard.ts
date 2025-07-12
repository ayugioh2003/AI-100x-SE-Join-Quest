import { Piece } from './Piece';
import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export class Guard extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.GUARD, position);
  }

  isValidMove(board: ChessBoard, from: Position, to: Position): boolean {
    // Check if target position is valid
    if (!board.isPositionValid(to)) {
      return false;
    }

    // Check if target has friendly piece
    const targetPiece = board.getPieceAt(to);
    if (targetPiece && targetPiece.color === this.color) {
      return false;
    }

    // Check if move is within palace
    if (!this.isWithinPalace(to)) {
      return false;
    }

    // Check if move is diagonal by exactly one step
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    // Guard can only move one step diagonally
    if (!(rowDiff === 1 && colDiff === 1)) {
      return false;
    }

    return true;
  }

  private isWithinPalace(position: Position): boolean {
    if (this.color === Color.RED) {
      return position.row >= 1 && position.row <= 3 && 
             position.col >= 4 && position.col <= 6;
    } else {
      return position.row >= 8 && position.row <= 10 && 
             position.col >= 4 && position.col <= 6;
    }
  }
}