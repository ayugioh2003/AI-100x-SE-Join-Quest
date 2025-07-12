import { Piece } from './Piece';
import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export class Soldier extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.SOLDIER, position);
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

    // Check if move is exactly one step
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;
    
    if (Math.abs(rowDiff) + Math.abs(colDiff) !== 1) {
      return false; // Must move exactly one step orthogonally
    }

    const hasCrossedRiver = this.hasCrossedRiver(from);

    if (!hasCrossedRiver) {
      // Before crossing river: can only move forward
      if (this.color === Color.RED) {
        return rowDiff === 1 && colDiff === 0; // Red moves up (increasing row)
      } else {
        return rowDiff === -1 && colDiff === 0; // Black moves down (decreasing row)
      }
    } else {
      // After crossing river: can move forward or sideways, but not backward
      if (this.color === Color.RED) {
        return rowDiff >= 0; // Red cannot move backward (decreasing row)
      } else {
        return rowDiff <= 0; // Black cannot move backward (increasing row)
      }
    }
  }

  private hasCrossedRiver(position: Position): boolean {
    if (this.color === Color.RED) {
      return position.row > 5; // Red crosses river after row 5
    } else {
      return position.row < 6; // Black crosses river before row 6
    }
  }
}