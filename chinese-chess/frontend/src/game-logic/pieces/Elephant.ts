import { Piece } from './Piece';
import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export class Elephant extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.ELEPHANT, position);
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

    // Check if elephant stays on its own side (cannot cross river)
    if (!this.isWithinOwnSide(to)) {
      return false;
    }

    // Check if move is exactly 2 steps diagonally (田字形)
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    if (!(rowDiff === 2 && colDiff === 2)) {
      return false;
    }

    // Check if the "eye" (midpoint) is blocked
    if (this.isEyeBlocked(board, from, to)) {
      return false;
    }

    return true;
  }

  private isWithinOwnSide(position: Position): boolean {
    if (this.color === Color.RED) {
      // Red elephant cannot cross row 5 (river is between row 5 and 6) - 根據原始測試定義
      return position.row <= 5;
    } else {
      // Black elephant cannot cross row 5 (must stay in rows 6-10) - 根據原始測試定義
      return position.row >= 6;
    }
  }

  private isEyeBlocked(board: ChessBoard, from: Position, to: Position): boolean {
    // Calculate the midpoint (elephant's "eye")
    const midRow = from.row + (to.row - from.row) / 2;
    const midCol = from.col + (to.col - from.col) / 2;
    const midpoint = new Position(midRow, midCol);
    
    return board.getPieceAt(midpoint) !== null;
  }
}