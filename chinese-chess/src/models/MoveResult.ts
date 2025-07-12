import { Color } from './enums';

export interface MoveResult {
  isLegal: boolean;
  gameOver: boolean;
  winner?: Color;
  reason?: string;
}