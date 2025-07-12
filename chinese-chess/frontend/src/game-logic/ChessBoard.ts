import { Position } from './Position';
import { Piece } from './pieces/Piece';
import { Color, PieceType } from './enums';
import { General } from './pieces/General';
import { Guard } from './pieces/Guard';
import { Rook } from './pieces/Rook';
import { Horse } from './pieces/Horse';
import { Cannon } from './pieces/Cannon';
import { Elephant } from './pieces/Elephant';
import { Soldier } from './pieces/Soldier';

export class ChessBoard {
  private board: (Piece | null)[][];

  constructor() {
    this.board = Array(10).fill(null).map(() => Array(9).fill(null));
    this.initializeBoard();
  }

  private initializeBoard(): void {
    // Black pieces (top side, rows 1-3)
    // Row 1: Main pieces
    this.setPieceAt(new Position(1, 1), new Rook(Color.BLACK, new Position(1, 1)));
    this.setPieceAt(new Position(1, 2), new Horse(Color.BLACK, new Position(1, 2)));
    this.setPieceAt(new Position(1, 3), new Elephant(Color.BLACK, new Position(1, 3)));
    this.setPieceAt(new Position(1, 4), new Guard(Color.BLACK, new Position(1, 4)));
    this.setPieceAt(new Position(1, 5), new General(Color.BLACK, new Position(1, 5)));
    this.setPieceAt(new Position(1, 6), new Guard(Color.BLACK, new Position(1, 6)));
    this.setPieceAt(new Position(1, 7), new Elephant(Color.BLACK, new Position(1, 7)));
    this.setPieceAt(new Position(1, 8), new Horse(Color.BLACK, new Position(1, 8)));
    this.setPieceAt(new Position(1, 9), new Rook(Color.BLACK, new Position(1, 9)));

    // Row 3: Cannons
    this.setPieceAt(new Position(3, 2), new Cannon(Color.BLACK, new Position(3, 2)));
    this.setPieceAt(new Position(3, 8), new Cannon(Color.BLACK, new Position(3, 8)));

    // Row 4: Soldiers
    this.setPieceAt(new Position(4, 1), new Soldier(Color.BLACK, new Position(4, 1)));
    this.setPieceAt(new Position(4, 3), new Soldier(Color.BLACK, new Position(4, 3)));
    this.setPieceAt(new Position(4, 5), new Soldier(Color.BLACK, new Position(4, 5)));
    this.setPieceAt(new Position(4, 7), new Soldier(Color.BLACK, new Position(4, 7)));
    this.setPieceAt(new Position(4, 9), new Soldier(Color.BLACK, new Position(4, 9)));

    // Red pieces (bottom side, rows 8-10)
    // Row 7: Soldiers
    this.setPieceAt(new Position(7, 1), new Soldier(Color.RED, new Position(7, 1)));
    this.setPieceAt(new Position(7, 3), new Soldier(Color.RED, new Position(7, 3)));
    this.setPieceAt(new Position(7, 5), new Soldier(Color.RED, new Position(7, 5)));
    this.setPieceAt(new Position(7, 7), new Soldier(Color.RED, new Position(7, 7)));
    this.setPieceAt(new Position(7, 9), new Soldier(Color.RED, new Position(7, 9)));

    // Row 8: Cannons
    this.setPieceAt(new Position(8, 2), new Cannon(Color.RED, new Position(8, 2)));
    this.setPieceAt(new Position(8, 8), new Cannon(Color.RED, new Position(8, 8)));

    // Row 10: Main pieces
    this.setPieceAt(new Position(10, 1), new Rook(Color.RED, new Position(10, 1)));
    this.setPieceAt(new Position(10, 2), new Horse(Color.RED, new Position(10, 2)));
    this.setPieceAt(new Position(10, 3), new Elephant(Color.RED, new Position(10, 3)));
    this.setPieceAt(new Position(10, 4), new Guard(Color.RED, new Position(10, 4)));
    this.setPieceAt(new Position(10, 5), new General(Color.RED, new Position(10, 5)));
    this.setPieceAt(new Position(10, 6), new Guard(Color.RED, new Position(10, 6)));
    this.setPieceAt(new Position(10, 7), new Elephant(Color.RED, new Position(10, 7)));
    this.setPieceAt(new Position(10, 8), new Horse(Color.RED, new Position(10, 8)));
    this.setPieceAt(new Position(10, 9), new Rook(Color.RED, new Position(10, 9)));
  }

  getPieceAt(position: Position): Piece | null {
    if (!this.isPositionValid(position)) {
      return null;
    }
    return this.board[position.row - 1][position.col - 1];
  }

  setPieceAt(position: Position, piece: Piece | null): void {
    if (this.isPositionValid(position)) {
      this.board[position.row - 1][position.col - 1] = piece;
    }
  }

  movePiece(from: Position, to: Position): void {
    const piece = this.getPieceAt(from);
    if (piece) {
      this.setPieceAt(from, null);
      this.setPieceAt(to, piece);
    }
  }

  isPositionValid(position: Position): boolean {
    return position.row >= 1 && position.row <= 10 && 
           position.col >= 1 && position.col <= 9;
  }

  // Helper method to check if there's a clear path between two positions
  isPathClear(from: Position, to: Position): boolean {
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;
    
    // Diagonal movement
    if (Math.abs(rowDiff) === Math.abs(colDiff)) {
      const rowStep = rowDiff > 0 ? 1 : -1;
      const colStep = colDiff > 0 ? 1 : -1;
      
      for (let i = 1; i < Math.abs(rowDiff); i++) {
        const checkPos = new Position(from.row + i * rowStep, from.col + i * colStep);
        if (this.getPieceAt(checkPos)) {
          return false;
        }
      }
    }
    // Horizontal movement
    else if (rowDiff === 0) {
      const step = colDiff > 0 ? 1 : -1;
      for (let col = from.col + step; col !== to.col; col += step) {
        const checkPos = new Position(from.row, col);
        if (this.getPieceAt(checkPos)) {
          return false;
        }
      }
    }
    // Vertical movement
    else if (colDiff === 0) {
      const step = rowDiff > 0 ? 1 : -1;
      for (let row = from.row + step; row !== to.row; row += step) {
        const checkPos = new Position(row, from.col);
        if (this.getPieceAt(checkPos)) {
          return false;
        }
      }
    }
    
    return true;
  }

  // Count pieces between two positions (for Cannon)
  countPiecesBetween(from: Position, to: Position): number {
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;
    let count = 0;
    
    // Horizontal movement
    if (rowDiff === 0) {
      const step = colDiff > 0 ? 1 : -1;
      for (let col = from.col + step; col !== to.col; col += step) {
        const checkPos = new Position(from.row, col);
        if (this.getPieceAt(checkPos)) {
          count++;
        }
      }
    }
    // Vertical movement
    else if (colDiff === 0) {
      const step = rowDiff > 0 ? 1 : -1;
      for (let row = from.row + step; row !== to.row; row += step) {
        const checkPos = new Position(row, from.col);
        if (this.getPieceAt(checkPos)) {
          count++;
        }
      }
    }
    
    return count;
  }
}