import { Piece } from './Piece';
import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export class Rook extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.ROOK, position);
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
    
    // Rook must move in straight line
    if (!(rowDiff === 0 || colDiff === 0)) {
      return false;
    }

    // Check if path is clear
    if (this.hasObstaclesBetween(board, from, to)) {
      return false;
    }

    return true;
  }

  private hasObstaclesBetween(board: ChessBoard, from: Position, to: Position): boolean {
    const rowStep = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
    const colStep = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);
    
    let currentRow = from.row + rowStep;
    let currentCol = from.col + colStep;
    
    while (currentRow !== to.row || currentCol !== to.col) {
      if (board.getPieceAt(new Position(currentRow, currentCol))) {
        return true; // Found obstacle
      }
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return false; // No obstacles found
  }
}