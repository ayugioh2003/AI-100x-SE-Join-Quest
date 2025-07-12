import { Position } from './Position';
import { Piece } from './pieces/Piece';

export class Move {
  constructor(
    public from: Position,
    public to: Position,
    public piece: Piece,
    public capturedPiece: Piece | null,
    public timestamp: Date = new Date()
  ) {}
}