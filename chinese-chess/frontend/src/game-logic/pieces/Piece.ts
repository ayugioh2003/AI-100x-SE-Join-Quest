import { ChessBoard } from '../ChessBoard';
import { Position } from '../Position';
import { Color, PieceType } from '../enums';

export abstract class Piece {
  constructor(
    public color: Color,
    public type: PieceType,
    public position: Position
  ) {}

  abstract isValidMove(board: ChessBoard, from: Position, to: Position): boolean;

  getPossibleMoves(board: ChessBoard): Position[] {
    const possibleMoves: Position[] = [];
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 9; col++) {
        const targetPos = new Position(row, col);
        if (this.isValidMove(board, this.position, targetPos)) {
          possibleMoves.push(targetPos);
        }
      }
    }
    return possibleMoves;
  }
}