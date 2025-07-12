import { Piece } from './Piece';
import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export class Horse extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.HORSE, position);
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

    // Check if move is in "L" shape (2+1 or 1+2)
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    if (!((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2))) {
      return false;
    }

    // Check for "leg blocking" (蹩馬腿)
    if (this.isBlocked(board, from, to)) {
      return false;
    }

    return true;
  }

  private isBlocked(board: ChessBoard, from: Position, to: Position): boolean {
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;
    
    let blockingPosition: Position;
    
    // Determine the blocking position based on the direction of movement
    if (Math.abs(rowDiff) === 2) {
      // Moving 2 vertically, 1 horizontally - check the intermediate vertical position
      blockingPosition = new Position(from.row + (rowDiff > 0 ? 1 : -1), from.col);
    } else {
      // Moving 1 vertically, 2 horizontally - check the intermediate horizontal position
      blockingPosition = new Position(from.row, from.col + (colDiff > 0 ? 1 : -1));
    }
    
    return board.getPieceAt(blockingPosition) !== null;
  }
}