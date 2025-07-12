export enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

export enum PieceType {
  GENERAL = 'GENERAL',
  GUARD = 'GUARD', 
  ROOK = 'ROOK',
  HORSE = 'HORSE',
  CANNON = 'CANNON',
  ELEPHANT = 'ELEPHANT',
  SOLDIER = 'SOLDIER'
}

export enum GameState {
  IN_PROGRESS = 'IN_PROGRESS',
  CHECKMATE = 'CHECKMATE',
  STALEMATE = 'STALEMATE',
  DRAW = 'DRAW'
}