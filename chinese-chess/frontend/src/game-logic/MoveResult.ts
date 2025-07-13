import { Color } from './enums';

export interface MoveResult {
  isLegal: boolean;
  success: boolean; // Alias for isLegal for convenience
  gameOver: boolean;
  winner?: Color;
  reason?: string;
  captured?: boolean; // Whether a piece was captured in this move
}