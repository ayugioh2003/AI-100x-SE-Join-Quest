import { Piece } from './Piece';
import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export class Soldier extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.SOLDIER, position);
  }

  isValidMove(board: ChessBoard, from: Position, to: Position): boolean {
    // Stub implementation - will be implemented when we get to Soldier scenarios
    return false;
  }
}