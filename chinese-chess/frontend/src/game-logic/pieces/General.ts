import { Piece } from './Piece';
import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export class General extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.GENERAL, position);
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

    // Check if move is only one step orthogonal
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    // General can only move one step in orthogonal directions
    if (!((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1))) {
      return false;
    }

    // Check if this move would result in generals facing each other
    if (this.wouldFaceOpponentGeneral(board, from, to)) {
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

  private wouldFaceOpponentGeneral(board: ChessBoard, from: Position, to: Position): boolean {
    // Temporarily make the move to check
    const originalPiece = board.getPieceAt(to);
    board.setPieceAt(to, this);
    board.setPieceAt(from, null);

    // Find opponent general
    const opponentColor = this.color === Color.RED ? Color.BLACK : Color.RED;
    let opponentGeneral: Position | null = null;
    
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 9; col++) {
        const pos = new Position(row, col);
        const piece = board.getPieceAt(pos);
        if (piece && piece.type === PieceType.GENERAL && piece.color === opponentColor) {
          opponentGeneral = pos;
          break;
        }
      }
      if (opponentGeneral) break;
    }

    let wouldFace = false;
    if (opponentGeneral && to.col === opponentGeneral.col) {
      // Check if there are no pieces between generals on the same column
      const startRow = Math.min(to.row, opponentGeneral.row) + 1;
      const endRow = Math.max(to.row, opponentGeneral.row) - 1;
      
      let hasPiecesBetween = false;
      for (let row = startRow; row <= endRow; row++) {
        if (board.getPieceAt(new Position(row, to.col))) {
          hasPiecesBetween = true;
          break;
        }
      }
      
      wouldFace = !hasPiecesBetween;
    }

    // Restore original position
    board.setPieceAt(from, this);
    board.setPieceAt(to, originalPiece);

    return wouldFace;
  }

}