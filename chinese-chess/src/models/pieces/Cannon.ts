import { Piece } from './Piece';
import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export class Cannon extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.CANNON, position);
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

    // Check if move is in straight line (horizontal or vertical)
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    // Cannon must move in straight line
    if (!(rowDiff === 0 || colDiff === 0)) {
      return false;
    }

    const piecesBetween = this.countPiecesBetween(board, from, to);
    
    if (targetPiece) {
      // Capturing: must have exactly one piece between (screen)
      return piecesBetween === 1;
    } else {
      // Moving: must have no pieces between
      return piecesBetween === 0;
    }
  }

  private countPiecesBetween(board: ChessBoard, from: Position, to: Position): number {
    const rowStep = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
    const colStep = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);
    
    let currentRow = from.row + rowStep;
    let currentCol = from.col + colStep;
    let count = 0;
    
    while (currentRow !== to.row || currentCol !== to.col) {
      if (board.getPieceAt(new Position(currentRow, currentCol))) {
        count++;
      }
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return count;
  }
}