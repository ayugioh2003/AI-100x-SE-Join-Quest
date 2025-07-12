export class Position {
  constructor(public row: number, public col: number) {}

  equals(other: Position): boolean {
    return this.row === other.row && this.col === other.col;
  }

  toString(): string {
    return `(${this.row}, ${this.col})`;
  }
}