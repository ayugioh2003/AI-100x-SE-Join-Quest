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
      // 紅仕只能在九宮格的五個斜角位置
      const validPositions = [
        { row: 8, col: 4 },   // 左上
        { row: 8, col: 6 },   // 右上
        { row: 9, col: 5 },   // 中間
        { row: 10, col: 4 },  // 左下
        { row: 10, col: 6 }   // 右下
      ];
      return validPositions.some(pos => 
        pos.row === position.row && pos.col === position.col
      );
    } else {
      // 黑士只能在九宮格的五個斜角位置
      const validPositions = [
        { row: 1, col: 4 },   // 左上
        { row: 1, col: 6 },   // 右上
        { row: 2, col: 5 },   // 中間
        { row: 3, col: 4 },   // 左下
        { row: 3, col: 6 }    // 右下
      ];
      return validPositions.some(pos => 
        pos.row === position.row && pos.col === position.col
      );
    }
  }
}