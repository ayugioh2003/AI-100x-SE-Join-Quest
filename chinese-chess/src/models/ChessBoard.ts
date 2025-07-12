import { Piece } from './pieces/Piece';
import { Position } from './Position';
import { Color } from './enums';

export class ChessBoard {
  private pieces: (Piece | null)[][] = [];

  constructor() {
    // Initialize empty 10x9 board
    for (let i = 0; i < 10; i++) {
      this.pieces[i] = new Array(9).fill(null);
    }
  }

  getPieceAt(position: Position): Piece | null {
    if (!this.isPositionValid(position)) {
      return null;
    }
    return this.pieces[position.row - 1][position.col - 1];
  }

  setPieceAt(position: Position, piece: Piece | null): void {
    if (this.isPositionValid(position)) {
      this.pieces[position.row - 1][position.col - 1] = piece;
    }
  }

  movePiece(from: Position, to: Position): void {
    const piece = this.getPieceAt(from);
    if (piece) {
      this.setPieceAt(to, piece);
      this.setPieceAt(from, null);
      piece.position = to;
    }
  }

  isPositionValid(position: Position): boolean {
    return position.row >= 1 && position.row <= 10 && 
           position.col >= 1 && position.col <= 9;
  }

  findGenerals(): Map<Color, Position> {
    const generals = new Map<Color, Position>();
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 9; col++) {
        const pos = new Position(row, col);
        const piece = this.getPieceAt(pos);
        if (piece && piece.type === 'GENERAL') {
          generals.set(piece.color, pos);
        }
      }
    }
    return generals;
  }
}